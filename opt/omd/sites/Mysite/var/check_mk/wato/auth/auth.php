<?php
// Created by Multisite UserDB Hook (activate-changes)
global $mk_users, $mk_roles, $mk_groups, $mk_folders;
$mk_users   = array(
    'omdadmin' => array(
        'locked' => false,
        'language' => null,
        'roles' => array(
            'admin',
        ),
        'last_pw_change' => 1461126062,
        'num_failed' => 0,
        'alias' => 'omdadmin',
        'enforce_pw_change' => false,
        'serial' => 0,
        'password' => 'M29dfyFjgy5iA',
    ),
    'Techwave' => array(
        'force_authuser_webservice' => false,
        'locked' => false,
        'roles' => array(
            'user',
        ),
        'language' => null,
        'alias' => 'techwvae',
        'force_authuser' => false,
        'num_failed' => 0,
        'contactgroups' => array(
            'all',
            'Techwave',
        ),
        'disable_notifications' => false,
        'start_url' => 'dashboard.py',
        'enforce_pw_change' => true,
        'serial' => 1,
        'password' => '$1$712738$N..zIaXMvk8Np8x2hdRLd1',
        'pager' => '',
        'email' => 'parvathi.konda@techwave.net',
        'last_pw_change' => 1461132133,
    ),
);
$mk_roles   = array(
    'admin' => array(
        'action.reschedule',
        'action.notifications',
        'action.enablechecks',
        'action.clearmodattr',
        'action.fakechecks',
        'action.customnotification',
        'action.acknowledge',
        'action.addcomment',
        'action.downtimes',
        'action.star',
        'view.mobile_notifications',
        'view.aggr_service',
        'view.hostgroupservices',
        'view.searchpnp',
        'view.starred_services',
        'view.hosttiles',
        'view.nagstamon_hosts',
        'view.servicegroup',
        'view.allhosts',
        'view.hostevents',
        'view.aggr_single_api',
        'view.downtimes_of_host',
        'view.searchsvc',
        'view.host_pending',
        'view.inv_swpacs',
        'view.downtime_history',
        'view.aggr_all',
        'view.mobile_svcproblems_unack',
        'view.hoststatus',
        'view.comments_of_service',
        'view.servicedesc',
        'view.problemsofhost',
        'view.hostgroupgrid',
        'view.mobile_hostproblems',
        'view.mobile_hostsvcevents',
        'view.notifications',
        'view.svcbygroups',
        'view.comments_of_host',
        'view.host_crit',
        'view.host_unknown',
        'view.logfile',
        'view.nagstamon_svc',
        'view.hostpnp',
        'view.sitesvcs',
        'view.mobile_svcproblems',
        'view.aggr_summary',
        'view.mobile_contactnotifications',
        'view.host_export',
        'view.hostgroup',
        'view.svc_dt_hist',
        'view.api_downtimes',
        'view.mobile_events',
        'view.hosts',
        'view.uncheckedsvc',
        'view.aggr_singlehosts',
        'view.downtimes_of_service',
        'view.allservices',
        'view.host_dt_hist',
        'view.mobile_hostsvcnotifications',
        'view.servicedescpnp',
        'view.hostgroups',
        'view.svcproblems',
        'view.inv_host',
        'view.mobile_svcevents',
        'view.starred_hosts',
        'view.sitehosts',
        'view.aggr_group',
        'view.hostproblems',
        'view.searchhost',
        'view.hostsvcevents',
        'view.inv_hosts_cpu',
        'view.svcproblems_dash',
        'view.mobile_hostproblems_unack',
        'view.downtimes',
        'view.hostproblems_dash',
        'view.aggr_host',
        'view.comments',
        'view.aggr_problems',
        'view.mobile_hoststatus',
        'view.hostnotifications',
        'view.host_warn',
        'view.aggr_all_api',
        'view.svcbyhgroups',
        'view.contactnotifications',
        'view.events',
        'view.events_dash',
        'view.host_ok',
        'view.mobile_searchsvc',
        'view.hostsvcnotifications',
        'view.mobile_searchhost',
        'view.aggr_hostnameaggrs',
        'view.host',
        'view.pendingsvc',
        'view.mobile_svcnotifications',
        'view.hostsbygroup',
        'view.mobile_host',
        'view.service',
        'view.svcgroups',
        'view.aggr_hostproblems',
        'view.svcnotifications',
        'view.alertstats',
        'view.allhosts_mini',
        'view.recentsvc',
        'view.aggr_singlehost',
        'view.aggr_hostgroup_boxed',
        'view.aggr_single',
        'view.mobile_service',
        'view.svcevents',
        'view.svcgroups_grid',
        'sidesnap.wiki',
        'sidesnap.wato_folders',
        'sidesnap.custom_links',
        'sidesnap.nagios_legacy',
        'sidesnap.dashboards',
        'sidesnap.summary_hosts',
        'sidesnap.admin_mini',
        'sidesnap.bookmarks',
        'sidesnap.speedometer',
        'sidesnap.biaggr_groups',
        'sidesnap.tactical_overview',
        'sidesnap.master_control',
        'sidesnap.sitestatus',
        'sidesnap.wato_foldertree',
        'sidesnap.performance',
        'sidesnap.problem_hosts',
        'sidesnap.nagvis_maps',
        'sidesnap.views',
        'sidesnap.hostgroups',
        'sidesnap.search',
        'sidesnap.hostmatrix',
        'sidesnap.about',
        'sidesnap.tag_tree',
        'sidesnap.admin',
        'sidesnap.servicegroups',
        'sidesnap.hosts',
        'sidesnap.time',
        'dashboard.simple_problems',
        'dashboard.main',
        'dashboard.topology',
        'wato.use',
        'wato.edit',
        'wato.seeall',
        'wato.activate',
        'wato.activateforeign',
        'wato.auditlog',
        'wato.hosts',
        'wato.edit_hosts',
        'wato.parentscan',
        'wato.move_hosts',
        'wato.manage_hosts',
        'wato.diag_host',
        'wato.clone_hosts',
        'wato.update_dns_cache',
        'wato.services',
        'wato.edit_folders',
        'wato.manage_folders',
        'wato.see_all_folders',
        'wato.all_folders',
        'wato.hosttags',
        'wato.global',
        'wato.rulesets',
        'wato.groups',
        'wato.timeperiods',
        'wato.sites',
        'wato.automation',
        'wato.users',
        'wato.notifications',
        'wato.snapshots',
        'wato.pattern_editor',
        'wato.bi_rules',
        'wato.download_agents',
        'nagvis.*_*_*',
        'bi.see_all',
        'general.notify',
        'wato.api_allowed',
        'general.use',
        'general.see_all',
        'general.edit_views',
        'general.publish_views',
        'general.see_user_views',
        'general.force_views',
        'general.edit_dashboards',
        'general.publish_dashboards',
        'general.see_user_dashboards',
        'general.force_dashboards',
        'general.view_option_columns',
        'general.view_option_refresh',
        'general.painter_options',
        'general.act',
        'general.see_sidebar',
        'general.configure_sidebar',
        'general.edit_profile',
        'general.edit_notifications',
        'general.disable_notifications',
        'general.edit_user_attributes',
        'general.change_password',
        'general.logout',
        'general.ignore_soft_limit',
        'general.ignore_hard_limit',
    ),
    'user' => array(
        'action.reschedule',
        'action.customnotification',
        'action.acknowledge',
        'action.addcomment',
        'action.downtimes',
        'action.star',
        'view.mobile_notifications',
        'view.aggr_service',
        'view.hostgroupservices',
        'view.searchpnp',
        'view.starred_services',
        'view.hosttiles',
        'view.nagstamon_hosts',
        'view.servicegroup',
        'view.allhosts',
        'view.hostevents',
        'view.aggr_single_api',
        'view.downtimes_of_host',
        'view.searchsvc',
        'view.host_pending',
        'view.inv_swpacs',
        'view.downtime_history',
        'view.aggr_all',
        'view.mobile_svcproblems_unack',
        'view.hoststatus',
        'view.comments_of_service',
        'view.servicedesc',
        'view.problemsofhost',
        'view.hostgroupgrid',
        'view.mobile_hostproblems',
        'view.mobile_hostsvcevents',
        'view.notifications',
        'view.svcbygroups',
        'view.comments_of_host',
        'view.host_crit',
        'view.host_unknown',
        'view.logfile',
        'view.nagstamon_svc',
        'view.hostpnp',
        'view.sitesvcs',
        'view.mobile_svcproblems',
        'view.aggr_summary',
        'view.mobile_contactnotifications',
        'view.host_export',
        'view.hostgroup',
        'view.svc_dt_hist',
        'view.api_downtimes',
        'view.mobile_events',
        'view.hosts',
        'view.uncheckedsvc',
        'view.aggr_singlehosts',
        'view.downtimes_of_service',
        'view.allservices',
        'view.host_dt_hist',
        'view.mobile_hostsvcnotifications',
        'view.servicedescpnp',
        'view.hostgroups',
        'view.svcproblems',
        'view.inv_host',
        'view.mobile_svcevents',
        'view.starred_hosts',
        'view.sitehosts',
        'view.aggr_group',
        'view.hostproblems',
        'view.searchhost',
        'view.hostsvcevents',
        'view.inv_hosts_cpu',
        'view.svcproblems_dash',
        'view.mobile_hostproblems_unack',
        'view.downtimes',
        'view.hostproblems_dash',
        'view.aggr_host',
        'view.comments',
        'view.aggr_problems',
        'view.mobile_hoststatus',
        'view.hostnotifications',
        'view.host_warn',
        'view.aggr_all_api',
        'view.svcbyhgroups',
        'view.contactnotifications',
        'view.events',
        'view.events_dash',
        'view.host_ok',
        'view.mobile_searchsvc',
        'view.hostsvcnotifications',
        'view.mobile_searchhost',
        'view.aggr_hostnameaggrs',
        'view.host',
        'view.pendingsvc',
        'view.mobile_svcnotifications',
        'view.hostsbygroup',
        'view.mobile_host',
        'view.service',
        'view.svcgroups',
        'view.aggr_hostproblems',
        'view.svcnotifications',
        'view.alertstats',
        'view.allhosts_mini',
        'view.recentsvc',
        'view.aggr_singlehost',
        'view.aggr_hostgroup_boxed',
        'view.aggr_single',
        'view.mobile_service',
        'view.svcevents',
        'view.svcgroups_grid',
        'sidesnap.wiki',
        'sidesnap.wato_folders',
        'sidesnap.custom_links',
        'sidesnap.nagios_legacy',
        'sidesnap.dashboards',
        'sidesnap.summary_hosts',
        'sidesnap.admin_mini',
        'sidesnap.bookmarks',
        'sidesnap.biaggr_groups',
        'sidesnap.tactical_overview',
        'sidesnap.sitestatus',
        'sidesnap.wato_foldertree',
        'sidesnap.problem_hosts',
        'sidesnap.nagvis_maps',
        'sidesnap.views',
        'sidesnap.hostgroups',
        'sidesnap.search',
        'sidesnap.hostmatrix',
        'sidesnap.about',
        'sidesnap.tag_tree',
        'sidesnap.admin',
        'sidesnap.servicegroups',
        'sidesnap.hosts',
        'sidesnap.time',
        'dashboard.simple_problems',
        'dashboard.main',
        'dashboard.topology',
        'wato.use',
        'wato.edit',
        'wato.activate',
        'wato.hosts',
        'wato.edit_hosts',
        'wato.parentscan',
        'wato.move_hosts',
        'wato.manage_hosts',
        'wato.diag_host',
        'wato.clone_hosts',
        'wato.update_dns_cache',
        'wato.services',
        'wato.edit_folders',
        'wato.manage_folders',
        'wato.rulesets',
        'wato.pattern_editor',
        'wato.download_agents',
        'nagvis.Map_view',
        'nagvis.Map_edit',
        'nagvis.Map_delete',
        'wato.api_allowed',
        'general.use',
        'general.edit_views',
        'general.publish_views',
        'general.see_user_views',
        'general.edit_dashboards',
        'general.publish_dashboards',
        'general.see_user_dashboards',
        'general.view_option_columns',
        'general.view_option_refresh',
        'general.painter_options',
        'general.act',
        'general.see_sidebar',
        'general.configure_sidebar',
        'general.edit_profile',
        'general.edit_notifications',
        'general.edit_user_attributes',
        'general.change_password',
        'general.logout',
        'general.ignore_soft_limit',
    ),
    'guest' => array(
        'view.mobile_notifications',
        'view.aggr_service',
        'view.hostgroupservices',
        'view.searchpnp',
        'view.starred_services',
        'view.hosttiles',
        'view.nagstamon_hosts',
        'view.servicegroup',
        'view.allhosts',
        'view.hostevents',
        'view.aggr_single_api',
        'view.downtimes_of_host',
        'view.searchsvc',
        'view.host_pending',
        'view.inv_swpacs',
        'view.downtime_history',
        'view.aggr_all',
        'view.mobile_svcproblems_unack',
        'view.hoststatus',
        'view.comments_of_service',
        'view.servicedesc',
        'view.problemsofhost',
        'view.hostgroupgrid',
        'view.mobile_hostproblems',
        'view.mobile_hostsvcevents',
        'view.notifications',
        'view.svcbygroups',
        'view.comments_of_host',
        'view.host_crit',
        'view.host_unknown',
        'view.logfile',
        'view.nagstamon_svc',
        'view.hostpnp',
        'view.sitesvcs',
        'view.mobile_svcproblems',
        'view.aggr_summary',
        'view.mobile_contactnotifications',
        'view.host_export',
        'view.hostgroup',
        'view.svc_dt_hist',
        'view.api_downtimes',
        'view.mobile_events',
        'view.hosts',
        'view.uncheckedsvc',
        'view.aggr_singlehosts',
        'view.downtimes_of_service',
        'view.allservices',
        'view.host_dt_hist',
        'view.mobile_hostsvcnotifications',
        'view.servicedescpnp',
        'view.hostgroups',
        'view.svcproblems',
        'view.inv_host',
        'view.mobile_svcevents',
        'view.starred_hosts',
        'view.sitehosts',
        'view.aggr_group',
        'view.hostproblems',
        'view.searchhost',
        'view.hostsvcevents',
        'view.inv_hosts_cpu',
        'view.svcproblems_dash',
        'view.mobile_hostproblems_unack',
        'view.downtimes',
        'view.hostproblems_dash',
        'view.aggr_host',
        'view.comments',
        'view.aggr_problems',
        'view.mobile_hoststatus',
        'view.hostnotifications',
        'view.host_warn',
        'view.aggr_all_api',
        'view.svcbyhgroups',
        'view.contactnotifications',
        'view.events',
        'view.events_dash',
        'view.host_ok',
        'view.mobile_searchsvc',
        'view.hostsvcnotifications',
        'view.mobile_searchhost',
        'view.aggr_hostnameaggrs',
        'view.host',
        'view.pendingsvc',
        'view.mobile_svcnotifications',
        'view.hostsbygroup',
        'view.mobile_host',
        'view.service',
        'view.svcgroups',
        'view.aggr_hostproblems',
        'view.svcnotifications',
        'view.alertstats',
        'view.allhosts_mini',
        'view.recentsvc',
        'view.aggr_singlehost',
        'view.aggr_hostgroup_boxed',
        'view.aggr_single',
        'view.mobile_service',
        'view.svcevents',
        'view.svcgroups_grid',
        'sidesnap.wiki',
        'sidesnap.wato_folders',
        'sidesnap.custom_links',
        'sidesnap.nagios_legacy',
        'sidesnap.dashboards',
        'sidesnap.summary_hosts',
        'sidesnap.bookmarks',
        'sidesnap.biaggr_groups',
        'sidesnap.tactical_overview',
        'sidesnap.wato_foldertree',
        'sidesnap.problem_hosts',
        'sidesnap.nagvis_maps',
        'sidesnap.views',
        'sidesnap.hostgroups',
        'sidesnap.search',
        'sidesnap.hostmatrix',
        'sidesnap.about',
        'sidesnap.tag_tree',
        'sidesnap.servicegroups',
        'sidesnap.hosts',
        'sidesnap.time',
        'dashboard.simple_problems',
        'dashboard.main',
        'dashboard.topology',
        'wato.download_agents',
        'nagvis.Rotation_view_*',
        'nagvis.Map_view_*',
        'bi.see_all',
        'wato.api_allowed',
        'general.use',
        'general.see_all',
        'general.see_user_views',
        'general.see_user_dashboards',
        'general.view_option_columns',
        'general.painter_options',
        'general.see_sidebar',
        'general.logout',
    ),
);
$mk_groups  = array(
);
$mk_folders = array(
);

function get_folder_permissions($username) {
    global $mk_folders;
    if(!isset($mk_folders[$username])) {
        return array();
    } else {
        $permissions = $mk_folders[$username];
        foreach ($permissions as $folder => $perms) {
            if (!isset($perms['read']))
                $perms['read'] = false;
            elseif (!isset($perms['write']))
                $perms['write'] = false;
        }
        return $permissions;
    }
}

function all_users() {
    global $mk_users;
    return $mk_users;
}

function user_roles($username) {
    global $mk_users;
    if(!isset($mk_users[$username]))
        return array();
    else
        return $mk_users[$username]['roles'];
}

function user_groups($username) {
    global $mk_users;
    if(!isset($mk_users[$username]) || !isset($mk_users[$username]['contactgroups']))
        return array();
    else
        return $mk_users[$username]['contactgroups'];
}

function user_permissions($username) {
    global $mk_roles;
    $permissions = array();

    foreach(user_roles($username) AS $role)
        $permissions = array_merge($permissions, $mk_roles[$role]);

    // Make the array uniq
    array_flip($permissions);
    array_flip($permissions);

    return $permissions;
}

function users_with_role($want_role) {
    global $mk_users, $mk_roles;
    $result = array();
    foreach($mk_users AS $username => $user) {
        foreach($user['roles'] AS $role) {
            if($want_role == $role) {
                $result[] = $username;
            }
        }
    }
    return $result;
}

function roles_with_permission($want_permission) {
    global $mk_roles;
    $result = array();
    foreach($mk_roles AS $rolename => $role) {
        foreach($role AS $permission) {
            if($permission == $want_permission) {
                $result[] = $rolename;
                break;
            }
        }
    }
    return $result;
}

function users_with_permission($need_permission) {
    global $mk_users;
    $result = array();
    foreach(roles_with_permission($need_permission) AS $rolename) {
        $result = array_merge($result, users_with_role($rolename));
    }
    return $result;
}

function may($username, $need_permission) {
    global $mk_roles;
    foreach(user_roles($username) AS $role) {
        foreach($mk_roles[$role] AS $permission) {
            if($need_permission == $permission) {
                return true;
            }
        }
    }
    return false;
}

function permitted_maps($username) {
    global $mk_groups;
    $maps = array();
    foreach (user_groups($username) AS $groupname) {
        if (isset($mk_groups[$groupname])) {
            foreach ($mk_groups[$groupname] AS $mapname) {
                $maps[$mapname] = null;
            }
        }
    }
    return array_keys($maps);
}

?>