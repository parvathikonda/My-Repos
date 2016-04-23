<?php
$conf['title'] = 'OMD Dokuwiki Mysite';
$conf['lang'] = 'en';
$conf['useacl'] = 1;
$conf['license'] = 'cc-by-sa';
$conf['superuser'] = '@admin';
$conf['template']='arctictut';
$conf['tpl']['arctictut']['sidebar'] = 'left';
$conf['tpl']['arctictut']['left_sidebar_content'] = 'index';
$conf['multisite']['authfile'] = '/omd/sites/Mysite/var/check_mk/wato/auth/auth.php';
$conf['multisite']['auth_secret'] = '/omd/sites/Mysite/etc/auth.secret';
$conf['multisite']['auth_serials'] = '/omd/sites/Mysite/etc/auth.serials';
$conf['multisite']['htpasswd'] = '/omd/sites/Mysite/etc/htpasswd';
$conf['tpl']['vector']['vector_navigation_location'] = 'sidebar';

?>
