export interface SingleTaskRequest {
  task: SingleTask;
  alarm: SingleAlarm | null;
}

interface SingleTask {
  title: string;
  content: string;
  date: Date | null;
  mainTask: string | null;
}

interface SingleAlarm {
  title: string;
  content: string;
  notifications: Date[];
  notificationTypes: number[];
}

export interface PeriodicTaskRequest {
  task: PeriodicTask;
  alarm: PeriodicAlarm | null;
}

interface PeriodicTask {
  title: string;
  content: string;
  start: string;
  stop: string | null;
  interval: number;
  intervalType: number;
}

interface PeriodicAlarm {
  title: string;
  content: string;
  notifications: number[];
  notificationTypes: number[];
}

interface ChangeStatus {
  status: number;
}
