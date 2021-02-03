import {Injectable} from '@angular/core';
import {Alarm} from "../../models/alarm";
import {Notification} from "../../models/notification";

export interface NotificationData {
  title: string;
  time: Date;
}

@Injectable()
export class NextNotificationService {
  private nextAlarm: NotificationData | null
  private readonly alarms: Alarm[];
  private readonly now: Date;

  constructor(alarms: Alarm[]) {
    this.nextAlarm = null;
    this.alarms = alarms;
    this.now = new Date();
  }

  public find(): void {
    this.alarms.forEach((alarm: Alarm) => {
      if (alarm.periodic) {
        this.searchPeriodic(alarm);
      } else {
        this.searchSingle(alarm);
      }
    })
  }

  public get(): NotificationData | null {
    return this.nextAlarm;
  }

  private searchSingle(alarm: Alarm): void {
    if (alarm.checked) {
      return;
    }
    alarm.notifications.forEach((notification: Notification) => {
      if (notification.checked) {
        return;
      }
      if (notification.time === null) {
        return;
      }
      const notificationDate: Date = new Date(notification.time);
      if (notificationDate.getTime() <= this.now.getTime()) {
        return;
      }
      if (this.nextAlarm === null) {
        this.nextAlarm = {
          title: alarm.title,
          time: notificationDate
        }
      } else {
        if (notificationDate.getTime() < this.nextAlarm.time.getTime()) {
          this.nextAlarm = {
            title: alarm.title,
            time: notificationDate
          }
        }
      }
    });
  }

  private searchPeriodic(alarm: Alarm): void {
    alarm.alarms.forEach((alarm: Alarm) => this.searchSingle(alarm));
  }
}
