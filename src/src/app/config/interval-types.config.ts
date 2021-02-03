export interface Type {
  value: string,
  name: string
}

export const intervalAlarmTypes: Type[] = [
  {value: 'day', name: 'days'},
  {value: 'week', name: 'weeks'},
  {value: 'month', name: 'months'}
]

export const intervalNotificationTypes: Type[] =
  [
    {value: '-1', name: 'previousDay'},
    {value: '0', name: 'currentDay'},
    {value: '1', name: 'nextDay'}
  ]
