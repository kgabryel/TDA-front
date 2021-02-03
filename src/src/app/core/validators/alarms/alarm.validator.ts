import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {alarmsRoutes} from "../../../config/routes.config";
import {formNames} from "../../factories/alarm.factory";
import {PeriodicAlarmRequest, SingleAlarmRequest} from "../../requests/alarms.request";
import {TimeUtils} from "../../utils/time.utils";

const required = 'required';
const invalidFormat = 'invalidFormat';
const tooLong = 'tooLong';
const invalidValue = 'invalidValue';

@Injectable()
export class AlarmValidator {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  validateSingle(form: AbstractControl): Observable<object> {
    const notifications = form.get(formNames.notifications) as FormArray;
    const types = form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    const alarm: SingleAlarmRequest = {
      title: form.get(formNames.mainGroup).get(formNames.title).value,
      content: form.get(formNames.mainGroup).get(formNames.content).value,
      notificationTypes: types.controls.map((data) => data.value),
      notifications: notifications.controls.map(data => (new Date(data.value))),
    };
    return this.httpClient.post<any>(alarmsRoutes.validateSingle, alarm).pipe(
      delay(1000),
      map<any, object>(() => null),
      catchError(error => {
          if (error.error.errors.title !== undefined) {
            const titleErrors = error.error.errors.title;
            if (titleErrors.includes(required)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({required: true});
            }
            if (titleErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({invalidFormat: true});
            }
            if (titleErrors.includes(tooLong)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({maxlength: true});
            }
          }

          if (error.error.errors.content !== undefined) {
            const contentErrors = error.error.errors.content;
            if (contentErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.content).setErrors({invalidFormat: true});
            }
          }

          let notifications = form.get(formNames.notifications) as FormArray;
          notifications.controls.forEach(function (notification, index) {
            if (error.error.errors['notifications.' + index] !== undefined) {
              const notificationErrors = error.error.errors['notifications.' + index];
              if (notificationErrors.includes(required)) {
                notification.setErrors({required: true});
              }
              if (notificationErrors.includes(invalidFormat)) {
                notification.setErrors({invalidFormat: true});
              }
            }
          })
          return of(null);
        }
      )
    );
  }


  validatePeriodic(form: AbstractControl): Observable<object> {
    let notificationsValue: number[] = [];
    const notifications = form.get(formNames.notifications) as FormArray;
    notifications.controls.forEach((notification: FormGroup) => {
      notificationsValue.push(TimeUtils.modifyTime(notification.get(formNames.notificationType).value, notification.get(formNames.notificationTime).value));
    });
    const types = form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    const alarm: PeriodicAlarmRequest = {
      title: form.get(formNames.mainGroup).get(formNames.title).value,
      content: form.get(formNames.contentGroup).get(formNames.content).value,
      notificationTypes: types.controls.map((data) => data.value),
      notifications: notificationsValue,
      start: form.get(formNames.mainGroup).get(formNames.dates).get(formNames.start).value,
      stop: form.get(formNames.mainGroup).get(formNames.dates).get(formNames.stop).value,
      interval:form.get(formNames.mainGroup).get(formNames.interval).value,
      intervalType: form.get(formNames.mainGroup).get(formNames.intervalType).value,
    };

    return this.httpClient.post<any>(alarmsRoutes.validatePeriodic, alarm).pipe(
      delay(1000),
      map<any, object>(() => null),
      catchError(error => {
          if (error.error.errors.title !== undefined) {
            const titleErrors = error.error.errors.title;
            if (titleErrors.includes(required)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({required: true});
            }
            if (titleErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({invalidFormat: true});
            }
            if (titleErrors.includes(tooLong)) {
              form.get(formNames.mainGroup).get(formNames.title).setErrors({maxlength: true});
            }
          }

          if (error.error.errors.content !== undefined) {
            const contentErrors = error.error.errors.content;
            if (contentErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.content).setErrors({invalidFormat: true});
            }
          }

          if (error.error.errors.start !== undefined) {
            const startDateErrors = error.error.errors.start;
            if (startDateErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.start).setErrors({required: true});
            }
            if (startDateErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.start).setErrors({invalidFormat: true});
            }
          }

          if (error.error.errors.stop !== undefined) {
            const stopDateErrors = error.error.errors.stop;
            if (stopDateErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.stop).setErrors({invalidFormat: true});
            }
            if (stopDateErrors.includes(invalidValue)) {
              form.get(formNames.mainGroup).get(formNames.stop).setErrors({invalidValue: true});
            }
          }

          if (error.error.errors.interval !== undefined) {
            const intervalErrors = error.error.errors.interval;
            if (intervalErrors.includes(required)) {
              form.get(formNames.mainGroup).get(formNames.interval).setErrors({required: true});
            }
            if (intervalErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.interval).setErrors({invalidFormat: true});
            }
            if (intervalErrors.includes(invalidValue)) {
              form.get(formNames.mainGroup).get(formNames.interval).setErrors({invalidValue: true});
            }
          }

          if (error.error.errors.intervalType !== undefined) {
            const intervalTypeErrors = error.error.errors.intervalType;
            if (intervalTypeErrors.includes(required)) {
              form.get(formNames.mainGroup).get(formNames.intervalType).setErrors({required: true});
            }
            if (intervalTypeErrors.includes(invalidFormat)) {
              form.get(formNames.mainGroup).get(formNames.intervalType).setErrors({invalidFormat: true});
            }
            if (intervalTypeErrors.includes(invalidValue)) {
              form.get(formNames.mainGroup).get(formNames.intervalType).setErrors({invalidValue: true});
            }
          }
          let notifications = form.get(formNames.notifications) as FormArray;
          notifications.controls.forEach(function (notification, index) {
            if (error.error.errors['notifications.' + index] !== undefined) {
              const notificationErrors = error.error.errors['notifications.' + index];
              if (notificationErrors.includes(required)) {
                notification.get(formNames.notificationTime).setErrors({required: true});
                notification.get(formNames.notificationType).setErrors({required: true});
              }
              if (notificationErrors.includes(invalidFormat)) {
                notification.get(formNames.notificationTime).setErrors({invalidFormat: true});
                notification.get(formNames.notificationType).setErrors({invalidFormat: true});
              }
            }
          })
          return of(null);
        }
      )
    );
  }
}
