import {Component, Input, OnInit} from '@angular/core';
import {Alarm, PeriodicAlarm} from "../../../../core/models/alarm";
import {PageEvent} from "@angular/material/paginator";
import {TaskStatus} from "../../../../core/models/task-status";
import {selectTask} from "../../../../store/selectors/task";
import {map, mergeMap} from "rxjs/operators";
import {selectStatus} from "../../../../store/selectors/task-status";
import {merge, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {BreakpointObserver} from "@angular/cdk/layout";
import {environment} from "../../../../../environments/environment";
import {PeriodicNotification} from "../../../../core/models/notification";
import {startOfDay} from "date-fns";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {NotificationType} from "../../../../core/models/notification-type";
import {selectNotificationType} from "../../../../store/selectors/notification-types";
import {alarmPeriodicDelete} from "../../../../store/actions";
import {pageSizeOptions} from "../../../../config/pagination.config";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'alarms-alarm-periodic',
  templateUrl: './alarm-periodic.component.html',
  styleUrls: ['../../shared/alarm.scss', './alarm-periodic.component.scss']
})
export class AlarmPeriodicComponent implements OnInit {
  @Input() public alarm: PeriodicAlarm;
  public selectedAlarms: Alarm[];
  public step: number;
  public length: number;
  public pageSize: number;
  public pageSizeOptions: number[];
  public status: TaskStatus;
  public hasAlarm = false;
  private store: Store<State>;
  public small$: Observable<boolean>;
  public smallNotification$: Observable<boolean>;
  private breakpointObserver: BreakpointObserver;
  public selectedNotifications: PeriodicNotification[];
  public availableDates: Date[];
  public date: Date;

  constructor(store: Store<State>, breakpointObserver: BreakpointObserver) {
    this.store = store;
    this.breakpointObserver = breakpointObserver;
    this.pageSize = 5;
    this.pageSizeOptions = pageSizeOptions;
  }

  ngOnInit(): void {
    this.availableDates = this.alarm.alarms.map(alarm => startOfDay(new Date(alarm.date))).sort((a, b) => a.getTime() - b.getTime());
    this.availableDates.forEach((date: Date) => {
      let today = startOfDay(new Date);
      if (this.date === undefined) {
        if (date.getTime() >= today.getTime()) {
          this.date = date;
        }
      }
    });
    this.length = this.alarm.notifications.length;
    this.selectedAlarms = this.alarm.alarms.slice(0, this.pageSize);
    this.selectedNotifications = this.alarm.notifications.slice(0, this.pageSize);
    this.breakpointObserver.observe('(max-width: 800px)').subscribe(data => this.small$ = of(data.matches));
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.smallNotification$ = of(data.matches));
    if (this.alarm.task !== null) {
      this.store.select(selectTask(this.alarm.task)).pipe(
        map(task => this.store.select(selectStatus(task.status))),
        mergeMap(res => merge(res))).subscribe(status => {
        this.hasAlarm = true;
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

  public showActual() {
    this.selectedAlarms = this.alarm.alarms.slice(0, this.pageSize);
    this.changeSection(0);

  }

  public paginateAlarms(event: PageEvent) {
    this.selectedAlarms = this.alarm.alarms.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  public paginateNotifications(event: PageEvent) {
    this.selectedNotifications = this.alarm.notifications.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

  public dateFilter(): CallableFunction {
    return (d: Date): boolean => {
      const time = d.getTime();
      return !!this.availableDates.find(x => x.getTime() == time);
    }
  }

  public change(event: MatDatepickerInputEvent<any>) {
    this.date = event.value;
  }

  public getNotificationType(type: number): Observable<NotificationType> {
    return this.store.select(selectNotificationType(type));
  }

  public deleteAlarm() {
    this.store.dispatch(alarmPeriodicDelete({id: this.alarm.id}));
  }
}
