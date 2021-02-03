import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {
  alarmCheck,
  alarmCheckSuccess,
  alarmLoad,
  alarmLoadSuccess,
  alarmsPeriodicCreate,
  alarmsPeriodicCreateSuccess,
  alarmsSingleCreate,
  alarmsSingleCreateSuccess,
  alarmSingleDelete,
  alarmPeriodicDelete,
  alarmUncheck,
  alarmUncheckModified,
  alarmUncheckUnmodified,
  notificationCheck,
  notificationCheckSuccess,
  notificationDelete,
  notificationDeleteSuccess,
  notificationUncheck,
  notificationUncheckModified,
  notificationUncheckUnmodified,
  alarmDeleteSuccess,
  notificationTypesLoadError,
  alarmSingleDeleteError,
  alarmPeriodicDeleteError,
  notificationDeleteError,
  alarmCheckError,
  alarmUncheckError,
  notificationUncheckError,
  notificationCheckError,
  alarmLoadError, alarmsSingleCreateError, alarmsPeriodicCreateError
} from "../actions";
import {AlarmsService} from "../../core/services/alarms/alarms.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {Update} from "@ngrx/entity";
import {Alarm} from "../../core/models/alarm";
import {Router} from "@angular/router";
import {PathUtils} from "../../core/utils/path.utils";
import {RoutingConfig} from "../../config/routing.config";
import {of} from "rxjs";


@Injectable()
export class AlarmsEffects {

  private actions: Actions;
  private alarmsService: AlarmsService;
  private notificationService: NotificationService;
  private router: Router;
  loadAlarms;
  addSingleAlarm;
  addPeriodicAlarm;
  checkAlarm;
  checkNotification;
  uncheckAlarm;
  uncheckNotification;
  alarmSingleDelete;
  alarmPeriodicDelete;
  notificationDelete;

  constructor(actions: Actions, alarmsService: AlarmsService, notificationService: NotificationService, router: Router) {
    this.actions = actions;
    this.alarmsService = alarmsService;
    this.notificationService = notificationService;
    this.router = router;
    this.createLoadAlarms();
    this.createAddSingleAlarm();
    this.createAddPeriodicAlarm();
    this.createCheckAlarm();
    this.createCheckNotification();
    this.createUncheckAlarm();
    this.createUncheckNotification();
    this.createDeleteSingleAlarm();
    this.createDeletePeriodicAlarm();
    this.createDeleteNotification();
  }

  private createDeleteSingleAlarm() {
    this.alarmSingleDelete = createEffect(() => this.actions.pipe(
      ofType(alarmSingleDelete),
      mergeMap(((action) => this.alarmsService.deleteAlarm(action.id, false).pipe(
        tap(() => this.notificationService.showMessage('alarms.alarmDeleted')),
        map((id => {
          return alarmDeleteSuccess({id})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(alarmSingleDeleteError())
        })
      )))
    ));
  }

  private createDeletePeriodicAlarm() {
    this.alarmPeriodicDelete = createEffect(() => this.actions.pipe(
      ofType(alarmPeriodicDelete),
      mergeMap(((action) => this.alarmsService.deleteAlarm(action.id, true).pipe(
        tap(() => this.notificationService.showMessage('alarms.alarmDeleted')),
        map((id => {
          return alarmDeleteSuccess({id})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(alarmPeriodicDeleteError())
        })
      )))
    ));
  }

  private createDeleteNotification() {
    this.notificationDelete = createEffect(() => this.actions.pipe(
      ofType(notificationDelete),
      mergeMap(((action) => this.alarmsService.deleteNotification(action.alarm, action.id).pipe(
        tap(() => this.notificationService.showMessage('alarms.notificationDeleted')),
        map((alarm => {
          if (typeof alarm === 'string') {
            return alarmDeleteSuccess({id: alarm});
          }
          const update: Update<Alarm> = {
            id: alarm.id,
            changes: alarm
          }
          return notificationDeleteSuccess({alarm: update})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(notificationDeleteError())
        })
      )))
    ));
  }

  private createCheckAlarm() {
    this.checkAlarm = createEffect(() =>
      this.actions.pipe(
        ofType(alarmCheck),
        mergeMap(action => this.alarmsService.checkAlarm(action.id).pipe(
          tap(() => this.notificationService.showMessage('alarms.alarmDisabled')),
          map((alarm => {
            const update: Update<Alarm> = {
              id: alarm.id,
              changes: alarm
            }
            return alarmCheckSuccess({alarm: update})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(alarmCheckError())
          })
        ))
      ));
  }

  private createUncheckAlarm() {
    this.uncheckAlarm = createEffect(() =>
      this.actions.pipe(
        ofType(alarmUncheck),
        mergeMap(action => this.alarmsService.uncheckAlarm(action.id).pipe(
          map((alarm => {
            if (alarm === null) {
              this.notificationService.showMessage('alarms.alarmAfterTime');
              return alarmUncheckUnmodified();
            } else {
              const update: Update<Alarm> = {
                id: alarm.id,
                changes: alarm
              }
              this.notificationService.showMessage('tasks.alarmActivated');
              return alarmUncheckModified({alarm: update});
            }
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(alarmUncheckError())
          })
        ))
      ));
  }

  private createUncheckNotification() {
    this.uncheckNotification = createEffect(() =>
      this.actions.pipe(
        ofType(notificationUncheck),
        mergeMap(action => this.alarmsService.uncheckNotification(action.id).pipe(
          map((alarm => {
            if (alarm === null) {
              this.notificationService.showMessage('alarms.notificationAfterTime');
              return notificationUncheckUnmodified();
            } else {
              const update: Update<Alarm> = {
                id: alarm.id,
                changes: alarm
              }
              this.notificationService.showMessage('alarms.notificationDisabled');
              return notificationUncheckModified({alarm: update});
            }
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(notificationUncheckError())
          })
        ))
      ));
  }

  private createCheckNotification() {
    this.checkNotification = createEffect(() =>
      this.actions.pipe(
        ofType(notificationCheck),
        mergeMap(action => this.alarmsService.checkNotification(action.id).pipe(
          tap(() => this.notificationService.showMessage('alarms.notificationActivated')),
          map((alarm => {
            const update: Update<Alarm> = {
              id: alarm.id,
              changes: alarm
            }
            return notificationCheckSuccess({alarm: update})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(notificationCheckError())
          })
        ))
      ));
  }

  private createLoadAlarms() {
    this.loadAlarms = createEffect(() => this.actions.pipe(
      ofType(alarmLoad),
      mergeMap((() => this.alarmsService.getAll().pipe(
        map((alarms => alarmLoadSuccess({alarms})))
      ))),
      catchError((error) => {
        this.notificationService.showError(error.status);
        return of(alarmLoadError())
      })
    ));
  }

  private createAddSingleAlarm() {
    this.addSingleAlarm = createEffect(() =>
      this.actions.pipe(
        ofType(alarmsSingleCreate),
        mergeMap(action => this.alarmsService.createSingle(action.alarm).pipe(
          tap(() => {
            this.router.navigate([PathUtils.concatPath(RoutingConfig.alarms)]);
            this.notificationService.showMessage('alarms.notificationAdded');
          }),
          map((alarm => {
            return alarmsSingleCreateSuccess({alarm})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(alarmsSingleCreateError())
          })
        ))
      ));
  }

  private createAddPeriodicAlarm() {
    this.addPeriodicAlarm = createEffect(() =>
      this.actions.pipe(
        ofType(alarmsPeriodicCreate),
        mergeMap(action => this.alarmsService.createPeriodic(action.alarm).pipe(
          tap(() => {
            this.notificationService.showMessage('alarms.alarmAdded');
            this.router.navigate([PathUtils.concatPath(RoutingConfig.alarms)]);
          }),
          map((alarm => {
            return alarmsPeriodicCreateSuccess({alarm})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(alarmsPeriodicCreateError())
          })
        ))
      ));
  }
}
