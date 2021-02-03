export interface SingleAlarmRequest {
  title: string;
  content: string;
  notifications: Date[];
  notificationTypes: number[];
}

export interface PeriodicAlarmRequest {
  title: string;
  content: string;
  notifications: number[];
  notificationTypes: number[];
  start: string;
  stop: string | null;
  interval: number;
  intervalType: string;
}
