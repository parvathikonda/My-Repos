{'hostsbygroup': {'browser_reload': 30,
                  'column_headers': 'pergroup',
                  'context': {'host_in_notification_period': {'is_host_in_notification_period': '-1'},
                              'host_scheduled_downtime_depth': {'is_host_scheduled_downtime_depth': '-1'},
                              'siteopt': {'site': ''},
                              'summary_host': {'is_summary_host': '-1'}},
                  'datasource': 'hostsbygroup',
                  'description': u'A complete listing of all host groups and each of their hosts\n',
                  'group_painters': [('sitealias', 'sitehosts', None),
                                     ('hg_alias', 'hostgroup', None)],
                  'hidden': False,
                  'hidebutton': False,
                  'icon': None,
                  'layout': 'boxed',
                  'linktitle': u'Host Groups',
                  'name': 'hostsbygroup',
                  'num_columns': 2,
                  'painters': [('host_state', None, None),
                               ('host', 'host', None),
                               ('host_icons', None, None),
                               ('alias', 'hoststatus', None),
                               ('num_services_ok', 'host_ok', None),
                               ('num_services_warn', 'host_warn', None),
                               ('num_services_unknown',
                                'host_unknown',
                                None),
                               ('num_services_crit', 'host_crit', None),
                               ('num_services_pending',
                                'host_pending',
                                None)],
                  'public': True,
                  'single_infos': [],
                  'sorters': [('site', False),
                              ('hostgroup', False),
                              ('site_host', False)],
                  'title': u'Host Groups',
                  'topic': u'Host Groups',
                  'user_sortable': True}}
