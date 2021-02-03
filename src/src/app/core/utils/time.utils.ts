import {addDays, format, isSameDay} from "date-fns";
import {NotificationData} from "../services/next-notification/next-notification.service";

export const secondsInDay: number = 86400;

export interface NotificationTimeWrapper {
  prefix: string;
  time: string;
}

export abstract class TimeUtils {
  public static parseTimeToSeconds(time: string): number {
    const parts: string[] = time.split(':');
    return (parseInt(parts[0]) * 60 * 60 + parseInt(parts[1]) * 60);
  }

  public static modifyTime(notificationType: string, time: string): number {
    switch (notificationType) {
      case '-1':
        return TimeUtils.parseTimeToSeconds(time) - secondsInDay;
      case '0':
        return TimeUtils.parseTimeToSeconds(time);
      case '1':
        return TimeUtils.parseTimeToSeconds(time) + secondsInDay;
    }
    return 0;
  }

  public static modifyDate(notification: NotificationData): NotificationTimeWrapper {
    const today = new Date();
    let wrapper: NotificationTimeWrapper = {
      prefix: '',
      time: ''
    }

    if (isSameDay(notification.time, today)) {
      wrapper.prefix = 'header.todayAt';
    } else if (isSameDay(notification.time, addDays(today, 1))) {
      wrapper.prefix = 'header.tomorrowAt';
    } else {
      wrapper.time = format(notification.time, 'MM.dd.yyyy');
    }
    wrapper.time += ' ' + format(notification.time, 'HH:mm')
    return wrapper;
  }
}
