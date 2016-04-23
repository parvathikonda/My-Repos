<?php
// Created by OMD hook MULTISITE_AUTHORISATION
// Use the permissions files generated by multisite
if(file_exists(OMD_SITE_ROOT.'/var/check_mk/wato/auth/auth.php')) {
    require_once(OMD_SITE_ROOT.'/var/check_mk/wato/auth/auth.php');
    
    // Before the first use of multisite the auth.php is empty and does not contain this
    // function. Do try to execute these functions in this case.
    if(function_exists('users_with_permission')) {
        $conf['allowed_for_all_services'] = implode(',', users_with_permission('general.see_all'));
        $conf['allowed_for_all_hosts'] = implode(',', users_with_permission('general.see_all'));
    }
}
?>
