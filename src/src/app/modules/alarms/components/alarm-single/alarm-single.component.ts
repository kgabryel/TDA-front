import {Component, Input, OnInit} from '@angular/core';
import {SingleAlarm} from "../../../../core/models/alarm";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {
  alarmCheck,
  alarmSingleDelete,
  alarmUncheck,
  notificationCheck,
  notificationDelete,
  notificationUncheck
} from "../../../../store/actions";
import {PageEvent} from "@angular/material/paginator";
import {Notification} from "../../../../core/models/notification";
import {selectTask} from "../../../../store/selectors/task";
import {map, mergeMap} from "rxjs/operators";
import {selectStatus} from "../../../../store/selectors/task-status";
import {merge, Observable, of} from "rxjs";
import {TaskStatus} from "../../../../core/models/task-status";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NotificationType} from "../../../../core/models/notification-type";
import {selectNotificationType} from "../../../../store/selectors/notification-types";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";
import {pageSizeOptions} from "../../../../config/pagination.config";

@Component({
  selector: 'alarms-alarm-single',
  templateUrl: './alarm-single.component.html',
  styleUrls: ['../../shared/alarm.scss', './alarm-single.component.scss']
})
export class AlarmSingleComponent implements OnInit {

  @Input() public alarm: SingleAlarm;
  private store: Store<State>
  public step: number;
  public pageSize: number;
  public pageSizeOptions: number[];
  public selectedNotifications: Notification[];
  public status: TaskStatus;
  public hasTask = false;
  public small$: Observable<boolean>;
  public smallNotification$: Observable<boolean>;
  private breakpointObserver: BreakpointObserver;

  constructor(store: Store<State>, breakpointObserver: BreakpointObserver) {
    this.store = store;
    this.pageSize = 5;
    this.pageSizeOptions = pageSizeOptions;
    this.breakpointObserver = breakpointObserver;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 800px)').subscribe(data => this.small$ = of(data.matches));
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.smallNotification$ = of(data.matches));
    this.hasTask = false;
    this.selectedNotifications = this.alarm.notifications.slice(0, this.pageSize);
    if (this.alarm.task !== null) {
      this.store.select(selectTask(this.alarm.task)).pipe(
        map(task => this.store.select(selectStatus(task.status))),
        mergeMap(res => merge(res))).subscribe(status => {
        this.hasTask = true;
        this.status = status as TaskStatus;
      });
    }
  }

  public changeSection(section: number): void {
    if (this.step === section) {
      this.step = -1;
    } else {
      this.step = section;
    }
  }

  public switchAlarm() {
    if (this.alarm.checked) {
      this.store.dispatch(alarmUncheck({id: this.alarm.id}));
    } else {
      this.store.dispatch(alarmCheck({id: this.alarm.id}));
    }
  }

  public switchNotification(notification: Notification) {
    if (notification.checked) {
      this.store.dispatch(notificationUncheck({id: notification.id}));
    } else {
      this.store.dispatch(notificationCheck({id: notification.id}));
    }
  }

  public deleteAlarm() {
    this.store.dispatch(alarmSingleDelete({id: this.alarm.id}));
  }

  public deleteNotification(notification: Notification) {
    this.store.dispatch(notificationDelete({alarm: this.alarm, id: notification.id}));
  }

  public paginate(event: PageEvent) {
    this.selectedNotifications = this.alarm.notifications.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  public getNotificationType(type: number): Observable<NotificationType> {
    return this.store.select(selectNotificationType(type));
  }
}
