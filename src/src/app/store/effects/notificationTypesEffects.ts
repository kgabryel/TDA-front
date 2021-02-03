import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {NotificationTypesService} from "../../core/services/notification-types/notification-types.service";
import {notificationTypesLoad, notificationTypesLoadError, notificationTypesLoadSuccess} from "../actions";
import {of} from "rxjs";
import {NotificationService} from "../../core/services/notification/notification.service";


@Injectable()
export class NotificationTypesEffects {

  private actions: Actions;
  private notificationTypesService: NotificationTypesService;
  private notificationService: NotificationService;
  loadNotificationTypes;

  constructor(actions: Actions, notificationTypesService: NotificationTypesService, notificationService: NotificationService) {
    this.actions = actions;
    this.notificationTypesService = notificationTypesService;
    this.createLoadNotificationTypesEffect();
  }

  private createLoadNotificationTypesEffect() {
    this.loadNotificationTypes = createEffect(() => this.actions.pipe(
      ofType(notificationTypesLoad),
      mergeMap((() => this.notificationTypesService.getAll().pipe(
        map((notificationTypes => notificationTypesLoadSuccess({notificationTypes})))
      ))),
      catchError((error) => {
        this.notificationService.showError(error.status);
        return of(notificationTypesLoadError())
      })
    ));
  }
}
