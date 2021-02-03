export interface Notification {
  id: number;
  time: string,
  checked: boolean;
  types: number[];
}

export interface PeriodicNotification{
  id: number;
  time: number,
  checked: boolean;
  types: number[];
}
