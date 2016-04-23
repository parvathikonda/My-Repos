{'main': {'context': {},
          'dashlets': [{'background': True,
                        'browser_reload': 30,
                        'column_headers': 'pergroup',
                        'context': {'host_in_notification_period': {'is_host_in_notification_period': '-1'},
                                    'host_scheduled_downtime_depth': {'is_host_scheduled_downtime_depth': '-1'},
                                    'siteopt': {'site': ''},
                                    'summary_host': {'is_summary_host': '-1'}},
                        'datasource': 'hostsbygroup',
                        'description': 'A complete listing of all host groups and each of their hosts',
                        'group_painters': [('sitealias',
                                            'sitehosts',
                                            None),
                                           ('hg_alias', 'hostgroup', None)],
                        'hidden': False,
                        'layout': 'boxed',
                        'mustsearch': False,
                        'name': 'dashlet_0',
                        'num_columns': 2,
                        'owner': '',
                        'painters': [('host_state', None, None),
                                     ('host', 'host', None),
                                     ('host_icons', None, None),
                                     ('alias', 'hoststatus', None),
                                     ('num_services_ok', 'host_ok', None),
                                     ('num_services_warn',
                                      'host_warn',
                                      None),
                                     ('num_services_unknown',
                                      'host_unknown',
                                      None),
                                     ('num_services_crit',
                                      'host_crit',
                                      None),
                                     ('num_services_pending',
                                      'host_pending',
                                      None)],
                        'position': (1, 4),
                        'public': True,
                        'show_title': True,
                        'single_infos': [],
                        'size': (-1, 59),
                        'sorters': [('site', False),
                                    ('hostgroup', False),
                                    ('site_host', False)],
                        'title': u'Host Groups',
                        'title_url': u'view.py?view_name=hostsbygroup',
                        'topic': 'Host Groups',
                        'type': 'view',
                        'user_sortable': True}],
          'description': 'This dashboard gives you a general overview on the state of your monitored devices.',
          'hidden': False,
          'mtime': 1461366355,
          'name': 'main',
          'owner': 'omdadmin',
          'public': True,
          'show_title': True,
          'single_infos': [],
          'title': 'Main Overview',
          'topic': 'Overview'}}
