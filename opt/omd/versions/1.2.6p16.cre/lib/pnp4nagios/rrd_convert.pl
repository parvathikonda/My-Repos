#!/usr/bin/perl
## pnp4nagios–0.6.25 rrd_convert.pl
## Copyright (c) 2006-2015 Joerg Linge (http://www.pnp4nagios.org)
##
## This program is free software; you can redistribute it and/or
## modify it under the terms of the GNU General Public License
## as published by the Free Software Foundation; either version 2
## of the License, or (at your option) any later version.
##
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
##
## You should have received a copy of the GNU General Public License
## along with this program; if not, write to the Free Software
## Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

use lib '/omd/versions/1.2.6p16.cre/lib/perl5/lib/perl5';

use strict;
use warnings;
use Getopt::Long;
use Time::HiRes qw(gettimeofday tv_interval);
use File::Find;
use File::Copy;

if( $< == 0 ){
    print "dont try this as root \n"; 
    exit 1;
}

#
# Some global Vars
#

my %conf = (
    CFG_DIR           => "/omd/versions/1.2.6p16.cre/etc/pnp4nagios/", 
    RRDPATH           => "/omd/versions/1.2.6p16.cre/var/pnp4nagios/perfdata",
    RRDTOOL           => "/bin/true",
    LOG_LEVEL         => 0,
    DRY_RUN           => 0,
    FORCE             => 0,
    RRD_BACKUP        => 1,
    RRD_STORAGE_TYPE  => "SINGLE",
    TMP_DIR           => '/tmp/rrd_convert',
    RRD_DAEMON_OPTS   => "",
    XML_MAX_AGE       => 3600,
);

Getopt::Long::Configure('bundling');
my ( $opt_V, $opt_h, $opt_c, $opt_l, $opt_x, $opt_p );
# defaults
$opt_x = 1;

GetOptions(
    "V|version"            => \$opt_V,
    "h|help"               => \$opt_h,
    "c|check_command=s"    => \$opt_c,
    "p|cfg_dir=s"          => \$opt_p,
    "l|list_commands"      => \$opt_l,
    "x|no_structure_check" => \$opt_x,
    "d|dry-run"            => \$conf{DRY_RUN},
    "t|tmp_dir=s"          => \$conf{TMP_DIR},
    "force"                => \$conf{FORCE},
);

print_help()    if $opt_h;
print_help_opt_p()	if !$opt_p;
print_help()    if !$opt_c and !$opt_l;
print_version() if $opt_V;

if($opt_p){
	$conf{CFG_DIR} = $opt_p;
}
parse_config($conf{CFG_DIR}."/process_perfdata.cfg");
if ( $conf{RRD_DAEMON_OPTS} ){
	$conf{RRD_DAEMON_OPTS} = "--daemon=".$conf{RRD_DAEMON_OPTS};
}

my @STRUCT; 
my %FILEHANDLE; 

my @commands; # list of commands
my @worklist; # list of found xml files

my %ds_list;
my %original_ds_list;
my $max_age = time() - $conf{XML_MAX_AGE};

my %stats = (
	'rrd_in'          => 0,
	'rrd_out'         => 0,
	'old_xml'         => 0,
	'xml_without_rrd' => 0,
	'runtime'         => 0,
);

main();

sub main{
	check_storage_type();
	find(\&wanted_xml_files, $conf{RRDPATH});
	summary();
	if($opt_l){  # List commands and exit
		summary_command_list();
		exit;
	}
	if($#worklist+1 > 0 ){
		my $answer = read_choice("Start Converter [n|y]?");
		unless ( $answer =~ m/^y$/i ){
			print "Exit...\n";
			exit;
		}
	}else{
		print "Check Command '".$opt_c."' not found in any XML File\n";
		print "\n";
		print "\n";
		summary_command_list();
		exit;
	}
	check_custom_template();
	write_custom_template();
	my $t0 = [gettimeofday];
	my $i = 0;
	foreach my $xmlfile ( @worklist ) {
		$i++;
		undef %ds_list;
		undef %original_ds_list;
		my($host,$service) = parse_xml_filename($xmlfile);
		my ($rrdfile) = $xmlfile =~ /^(.*)\.xml$/;
        $rrdfile .= ".rrd";
		if(-r $rrdfile){
			create_dir($conf{TMP_DIR});
			my $dumpfile = sprintf("%s/%s-%s.dump",$conf{TMP_DIR},$host,$service);
			print "File ".$i."/".($#worklist+1)."\n";
			rrdtool_dump($rrdfile,$dumpfile);
			parse_pnp_xml($xmlfile);
			build_ds_list($rrdfile);
			next if check_ds_list();
			open_files($host,$service);
			manipulate_rrd_dump($dumpfile);
			close_files();
			restore_files($host,$service);
			backup_rrd_file($rrdfile);
		}
	}
	my $t1 = [gettimeofday];
	$stats{runtime} = tv_interval $t0, $t1;
	print "DONE\n";
	stats();
}


sub build_ds_list{
	my $rrdfile = shift;
	my @info;
	@info = `$conf{'RRDTOOL'} info $rrdfile`;
	if( $? > 0 ){
		print "ERROR: $conf{'RRDTOOL'} info $rrdfile returns with $?\n";
		exit 1;
	}
	foreach(@info){
		if(m/ds\[(\d+)\]\.type/ ) {
			$ds_list{$1} = $1;
		}
	}
	my $test = keys %ds_list;
	%original_ds_list = %ds_list;
}

sub check_ds_list{
	my $rrd_ds_count = keys %ds_list;
	my $xml_ds_count = $#STRUCT;
	if($rrd_ds_count == $xml_ds_count){
		return 0;
	}elsif($rrd_ds_count <= $xml_ds_count && $opt_x){
		printf("OK: RRD contains '%s' DS but XML contains '%s'. Convert forced by --no_structure_check\n",$rrd_ds_count,$xml_ds_count);
		return 0;
	}else{
		printf ("ERROR: RRD Structure mismatch. DS Count is '%s' but should be '%s'\n",$rrd_ds_count,$xml_ds_count);
		return 1;
	}
}

sub wanted_xml_files{
	if(m/.xml$/){
       	#printf("File: %s\n",$File::Find::name);
        my $xmlfile = $File::Find::name;
        my ($rrdfile) = $xmlfile =~ /^(.*)\.xml$/;
		$rrdfile .= ".rrd";
		my $mtime = (stat($xmlfile))[9];
		if ( $mtime < $max_age ){
			$stats{old_xml}++;
			return;
		}
        open(XML, $xmlfile);
       	while (<XML>) {
            if(/TEMPLATE>(.*)</){
                my ($t) = split("!",$1);
                push(@commands,$t);
                if(( defined $opt_c) and ($t =~ /^$opt_c$/)){
					if( -e $rrdfile ){
                  		#print "Found: ".$t." in ".$xmlfile."\n";
                    	push(@worklist,$xmlfile);
					}else{
						$stats{xml_without_rrd}++;
					}
                }elsif(( defined $opt_c) and ($opt_c eq 'ALL')){
					if( -e $rrdfile ){
						# Keyword 'ALL' retunrs all XML Files
                    	push(@worklist,$xmlfile);
					}else{
						$stats{xml_without_rrd}++;
					}
				}
            }
        }
        close(XML);
	}
}

sub parse_xml_filename{
	my $xmlfile = shift;
	$_ = $xmlfile;
        if( m/([^\/]+)\/([^\/]+)\.xml$/i ){
		return ($1, $2);
	}
}
sub summary{
	my %seen;
	my @uniqed = grep !$seen{$_}++, @commands;
	print "\n";
	printf "%-40s %s\n"  ,"Search pattern",$opt_c if( defined ($opt_c) );
	printf "%-40s %s\n"  ,"XML Files analyzed",$#commands+1;
	printf "%-40s %s\n"  ,"XML Files found",$#worklist+1;
	printf "%-40s %s\n"  ,"XML Files without RRD",$stats{'xml_without_rrd'};
	printf "%-40s %s\n"  ,"Old XML Files ignored",$stats{'old_xml'};
	printf "%-40s %s\n"  ,"Number of unique check_commands",$#uniqed+1;
	if($conf{DRY_RUN} == 1){
		printf "%-40s %s\n"  ,"Dry run?","[YES]";
		printf "%-40s %s\n"  ,"Temp Directory",$conf{TMP_DIR};
		print "\n\n";
		print "This is only a 'dry run'. The new RRD Files are stored in '$conf{TMP_DIR}'\n";
		print "\n";
	}
}

sub summary_command_list{
	my %seen;
	my @uniqed = grep !$seen{$_}++, @commands;
	printf "\\ List of Check Commands\n";
	foreach my $key (sort { $seen{$b} <=> $seen{$a} } keys %seen ) {
	     printf " |- %-36s %5s\n",$key,$seen{$key};
	}   
}

sub stats{
	print "\n\n \\Statistics:\n";
	foreach my $key (sort { $stats{$b} cmp $stats{$a} } keys %stats ) {
	     printf " |- %-15s %s\n",$key,$stats{$key};
	}   
}

sub create_dir{
	my $dir = shift;
	unless ( -d "$dir" ) {
       	unless ( mkdir "$dir" ) {
			print "ERROR: $dir is not writable\n";
       		exit 1;
       	}
   	}
}

sub open_files(){
	my $host = shift;
	my $service = shift;
	foreach my $ds (keys %ds_list){
		my $file = sprintf("%s/%s-%s-%s.restore",$conf{TMP_DIR},$host,$service,$STRUCT[$ds]{NAME});
		#print "Open Filehandle ".$file."\n";
		open($FILEHANDLE{$ds}, ">", $file);
	}
}

sub close_files(){
	foreach my $ds (keys %ds_list){
		#$ds--;
		#print "Close Filehandle ".$STRUCT[$ds]{NAME}."\n";
		close($FILEHANDLE{$ds});
	}
}

sub write_to_files{
	my $data = shift;
	foreach my $ds (keys %ds_list){
		print { $FILEHANDLE{$ds} } $data;
	}
}

sub restore_files(){
	my $host = shift;
	my $service = shift;
	my $err;
	$| = 1;
	print "Restoring File\n";
	foreach my $ds (keys %ds_list){
		my $rrdfile = '';
		my $restorefile = sprintf("%s/%s-%s-%s.restore",$conf{TMP_DIR},$host,$service,$STRUCT[$ds]{NAME});
		if( $conf{'DRY_RUN'} == 1 ){
			$rrdfile = sprintf("%s/%s/%s_%s.rrd",$conf{TMP_DIR},$host,$service,$STRUCT[$ds]{NAME});
			create_dir(sprintf("%s/%s", $conf{TMP_DIR},$host ));
		}else{
			$rrdfile = sprintf("%s/%s/%s_%s.rrd",$conf{RRDPATH},$host,$service,$STRUCT[$ds]{NAME});
		}
		print "$rrdfile\n";
		$err = system("$conf{'RRDTOOL'} restore -f '$restorefile' '$rrdfile'");
		if($err){
			printf("RRDtool Error: %s\n",$err);
			exit;
		}
		unlink($restorefile);
		$stats{rrd_out}++;
	}
	print "... done\n";
	$| = 0;
}

sub backup_rrd_file{
	my $rrdfile = shift;
	if ( $conf{RRD_BACKUP} == 1 ){
		move($rrdfile, $rrdfile.".backup");
	}
}

sub parse_pnp_xml{
	my $xmlfile = shift;
	undef @STRUCT;
	#print "reading $xmlfile\n";
	open(XML, $xmlfile);
	my $DATASOURCE = 0;
	while (<XML>) {
		if(/<DATASOURCE>/){
			$DATASOURCE++;
		}
		if(/<RRD>/){
			$DATASOURCE = 0;
		}
		if(/<([A-Z_]+)>(.*)<\/[A-Z_]+>/ && $DATASOURCE != -1){
			$STRUCT[$DATASOURCE]{$1} = $2;
		}
	}	
	close(XML);
	return @STRUCT;
}

sub rrdtool_dump{
	my $rrdfile = shift;
	my $dumpfile = shift;
	my $err;
	print "RRDtool dump to $dumpfile\n";
	if ( $conf{RRD_DAEMON_OPTS} ){
		$err = system("$conf{'RRDTOOL'} dump $conf{RRD_DAEMON_OPTS} $rrdfile > $dumpfile");
	}else{
		$err = system("$conf{'RRDTOOL'} dump $rrdfile > $dumpfile");
	}
	if($err){
		printf("RRDtool Error: %s\n",$err);
		exit;
	}
	$stats{rrd_in}++;
	return $dumpfile;
}
 
sub manipulate_rrd_dump{
	my $tmpfile = shift;
	my $i = 0;
	open (XML,$tmpfile);
	my @ROW = ();
	my $tmpds = 1;
	my $inside_ds_block = 0;
	print "Manipulating $tmpfile\n";
	while (<XML>){
		$i++;
		unless ( $i % 5000 ){
			$| = 1; print "."; $| = 0;
		}
		my $d = $_;
		#
		# A Data Row
		if(m/<row>/){
			m/(.*<row>)/;
			my $rowstart = $1;
			@ROW = m{<v>([^<].*?)<\/v>}gc;
			my $fh = 1;
			foreach my $VAL (@ROW){
				undef %ds_list;
				$ds_list{$fh} = $fh;
				write_to_files($rowstart."<v>".$VAL."</v></row>\n");
				$fh++;
			}
			next;
		}
		if(m/<ds>/){
			$inside_ds_block = 1;
			undef %ds_list;
			$ds_list{$tmpds} = $tmpds;
			write_to_files($d);
			$tmpds++;
			next;
		}
		if(m/<cdp_prep>/){
			write_to_files($d);
			$inside_ds_block = 0;
			$tmpds = 1;
			%ds_list = %original_ds_list;
			next;
		}
		if(m/<\/ds>/){
			write_to_files($d);
			$inside_ds_block = 0;
			# write to all files alter </ds>
			%ds_list = %original_ds_list;
			next;
		}
		if(m/<\/database>/){
			# write to all files alter </database>
			%ds_list = %original_ds_list;
			write_to_files($d);
			next;
		}
		if($inside_ds_block == 1){
			# rename DS
			$d =~ s/<name>(.*)<\/name>/<name> 1 <\/name>/;
		}
		write_to_files($d);
	}
	close(XML);
	print "... done $i lines\n";
	unlink($tmpfile);
}

#
# Parse process_perfdata.cfg
#
sub parse_config {
    my $config_file = shift;
    my $line        = 0;
	if( ! -e $config_file ){
		print "$config_file not found\n";
		exit;
	}
    if ( -e $config_file ) {
        open CFG, '<', "$config_file";
        while (<CFG>) {
            $line++;
            chomp;
            s/ //g;
            next if /^#/;
            next if /^$/;
            s/#.*//;

            if (/^(.*)=(.*)$/) {
                if ( defined $conf{$1} ) {
                    $conf{$1} = $2;
                }
            }
        }
        close CFG;
    }
}

#
# Change RRD_STORAGE_TYPE to MULTIPLE
#
sub change_config {
	my $cfg_file = $conf{'CFG_DIR'}."/process_perfdata.cfg";
	my $error = system("sed -i -e ".'s/\s*RRD_STORAGE_TYPE\s*=\s*SINGLE/RRD_STORAGE_TYPE=MULTIPLE/i'." $cfg_file");	
}

sub check_storage_type{
	if($conf{'RRD_STORAGE_TYPE'} eq "MULTIPLE"){
		print "RRD_STORAGE_TYPE is already set to ".$conf{'RRD_STORAGE_TYPE'}."\n"; 
	}
}
sub check_custom_template {
 	my $command = $opt_c;
	if ( $conf{DRY_RUN} == 1 ){
		print "No config check while DRY_RUN = 1\n";
		return;
	}
	if ( $command eq "ALL" ){
		return;
	}
	my $config_file = $conf{'CFG_DIR'}."/check_commands/".$command.".cfg";
	my $storage_type = "MULTIPLE";
	if ( -e $config_file && $conf{'FORCE'} == 0 ) {
		print "\nConfig for command $command does already exist ($config_file)\n\n";
		exit 0;
	}
}

sub write_custom_template {
 	my $command = $opt_c;
	if ( $conf{DRY_RUN} == 1 ){
		print "No config check while DRY_RUN = 1\n";
		return;
	}
	if ( $opt_c eq "ALL"){
		change_config();
		return;
	}
	my $config_file = $conf{'CFG_DIR'}."/check_commands/".$command.".cfg";
	my $storage_type = "MULTIPLE";
	open(CFG, ">", $config_file);
	print CFG "# Generated by rrd_convert.pl 0.6.25\n";
	print CFG "RRD_STORAGE_TYPE = MULTIPLE\n";
	close(CFG);
	if ( -s $config_file ) {
		print "\nConfig for command $command created ($config_file)\n";
	}
}
sub read_choice{
        my $question = shift;
        print $question.":";
        my $answer = <STDIN>;
        chomp $answer;
        return $answer;
}


sub print_help{
	print "Usage: $0 --check_command=<nagios_check_command>\n";
	print "          --cfg_dir=<path_to_pnp_etc_dir>\n";
	print "          [ --list_commands ]\n";
	print "          [ --dry-run ]\n";
	print "          [ --tmp_dir=<temp directory> ]\n";
	print "          [ --no_structure_check ]\n";
	print "\n";
	print "This script is used to switch to RRD_STORAGE_TYPE = MULTIPLE for a given Nagios Check Command\n";
	print "More info online http://docs.pnp4nagios.org/pnp-0.6/rrd_convert\n";
	exit;
}

sub print_help_opt_p{
	print "\n";
	print "--cfg_dir not set\n";
	print "Please provide the path to your PNP4Nagios config directory\n";
	print "\n";
	print_help();
}

sub print_version{
	print "Version 0.6.25\n";
	exit;
}
