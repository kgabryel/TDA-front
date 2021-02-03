import {Notification, PeriodicNotification} from "./notification";

export interface Alarm {
  id: string;
  title: string;
  content: string;
  checked: boolean;
  notifications: Notification[];
  periodic: boolean;
  start: string | null;
  stop: string | null;
  interval: number | null;
  intervalType: string | null;
  alarms: Alarm[] | null;
  date: string | null;
  task: string | null;
}

export interface SingleAlarm {
  id: string;
  title: string;
  content: string;
  checked: boolean;
  notifications: Notification[];
  task: string | null;
}

export interface PeriodicAlarm {
  id: string;
  title: string;
  content: string;
  start: string;
  stop: string | null;
  interval: number;
  intervalType: string;
  task: string | null;
  notifications: PeriodicNotification[];
  alarms: Alarm[];
}

export type AlarmType = Alarm | SingleAlarm | PeriodicAlarm;
