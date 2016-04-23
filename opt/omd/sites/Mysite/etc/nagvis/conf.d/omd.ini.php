; <?php return 1; ?>
; -----------------------------------------------------------------
; Don't touch this file. It is under control of OMD. Modifying this
; file might break the update mechanism of OMD.
;
; If you want to customize your NagVis configuration please use the
; etc/nagvis/nagvis.ini.php file.
; -----------------------------------------------------------------

[global]
sesscookiepath="/Mysite/nagvis"
authorisation_group_perms_file="/omd/sites/Mysite/etc/nagvis/perms.db"

[paths]
base="/omd/sites/Mysite/share/nagvis/"
local_base="/omd/sites/Mysite/local/share/nagvis/"
cfg="/omd/sites/Mysite/etc/nagvis/"
mapcfg="/omd/sites/Mysite/etc/nagvis/maps/"
geomap="/omd/sites/Mysite/etc/nagvis/geomap/"
var="/omd/sites/Mysite/tmp/nagvis/"
sharedvar="/omd/sites/Mysite/tmp/nagvis/share/"
profiles="/omd/sites/Mysite/var/nagvis/profiles/"
htmlbase="/Mysite/nagvis"
local_htmlbase="/Mysite/nagvis/local"
htmlcgi="/Mysite/nagios/cgi-bin"

[defaults]
backend="Mysite"

[backend_Mysite]
backendtype="mklivestatus"
socket="unix:/omd/sites/Mysite/tmp/run/live"
