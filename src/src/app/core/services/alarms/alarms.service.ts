import {Injectable} from '@angular/core';
import {PeriodicAlarmRequest, SingleAlarmRequest} from "../../requests/alarms.request";
import {alarmsRoutes} from "../../../config/routes.config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Alarm, AlarmType} from "../../models/alarm";
import {map} from "rxjs/operators";

@Injectable()
export class AlarmsService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): Observable<Alarm[]> {
    return this.httpClient.get<Alarm[]>(alarmsRoutes.index);
  }

  public createSingle(alarm: SingleAlarmRequest): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.createSingle, alarm);
  }

  public createPeriodic(alarm: PeriodicAlarmRequest): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.createPeriodic, alarm);
  }

  public checkAlarm(id: string): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.checkAlarm(id), null);
  }

  public uncheckAlarm(id: string): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.uncheckAlarm(id), null);
  }

  public checkNotification(id: number): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.checkNotification(id), null);
  }

  public uncheckNotification(id: number): Observable<Alarm> {
    return this.httpClient.post<Alarm>(alarmsRoutes.uncheckNotification(id), null);
  }

  public deleteAlarm(id: string, isPeriodic: boolean): Observable<string> {
    let route: string;
    if (isPeriodic) {
      route = alarmsRoutes.deletePeriodicAlarm(id);
    } else {
      route = alarmsRoutes.deleteSingleAlarm(id);
    }
    return this.httpClient.delete<any>(route).pipe(
      map(() => id)
    );
  }

  public deleteNotification(notificationAlarm: AlarmType, id: number): Observable<any> {
    return this.httpClient.delete<Alarm>(alarmsRoutes.notificationById(id)).pipe(map(alarm => {
      if (alarm === null) {
        return notificationAlarm.id;
      } else {
        return alarm;
      }
    }));
  }
}
