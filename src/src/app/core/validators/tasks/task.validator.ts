import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {tasksRoutes} from "../../../config/routes.config";
import {formNames} from "../../factories/task.factory";
import {TimeUtils} from "../../utils/time.utils";
import {SingleTaskRequest, PeriodicTaskRequest} from "../../requests/tasks.request";
import {tasksPeriodicCreate, tasksSingleCreate} from "../../../store/actions";
import {CreateStore} from "../../../modules/tasks/store/create/state";

const required = 'required';
const invalidFormat = 'invalidFormat';
const tooLong = 'tooLong';
const invalidValue = 'invalidValue';

@Injectable()
export class TaskValidator {
  private httpClient: HttpClient;
  private createStore: CreateStore;

  constructor(httpClient: HttpClient, createStore: CreateStore) {
    this.httpClient = httpClient;
    this.createStore = createStore;
  }

  validateSingle(form: AbstractControl): Observable<object> {
    const notifications = form.get(formNames.notifications) as FormArray;
    const types = form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    const task: SingleTaskRequest = {
      alarm: null,
      task: {
        title: form.get(formNames.taskGroup).get(formNames.title).value,
        content: form.get(formNames.taskGroup).get(formNames.content).value,
        date: (new Date(form.get(formNames.taskGroup).get(formNames.date).value)),
        mainTask: form.get(formNames.taskGroup).get(formNames.search).value?.id
      }
    };
    this.createStore.getAlarmState().subscribe(alarmAssigned => {
      if (alarmAssigned) {
        task.alarm = {
          title: form.get(formNames.alarmGroup).get(formNames.title).value,
          content: form.get(formNames.alarmGroup).get(formNames.content).value,
          notifications: notifications.controls.map(data => new Date(data.value)),
          notificationTypes: types.controls.map((data) => data.value),
        }
      }
      this.httpClient.post<any>(tasksRoutes.validateSingle, task).pipe(
        delay(1000),
        map<any, object>(() => null),
        catchError(error => {
            if (error.error.errors['task.title'] !== undefined) {
              const titleErrors = error.error.errors['task.title'];
              if (titleErrors.includes(required)) {
                form.get(formNames.taskGroup).get(formNames.title).setErrors({required: true});
              }
              if (titleErrors.includes(invalidFormat)) {
                form.get(formNames.taskGroup).get(formNames.title).setErrors({invalidFormat: true});
              }
              if (titleErrors.includes(tooLong)) {
                form.get(formNames.taskGroup).get(formNames.title).setErrors({maxlength: true});
              }
            }
            if (error.error.errors['task.content'] !== undefined) {
              const contentErrors = error.error.errors['task.content'];
              if (contentErrors.includes(invalidFormat)) {
                form.get(formNames.taskGroup).get(formNames.content).setErrors({invalidFormat: true});
              }
            }
            if (error.error.errors['task.mainTask'] !== undefined) {
              const mainTaskErrors = error.error.errors['task.mainTask'];
              if (mainTaskErrors.includes(invalidValue)) {
                form.get(formNames.taskGroup).get(formNames.search).setErrors({invalidValue: true});
              }
            }

            if (error.error.errors['task.date'] !== undefined) {
              const dateErrors = error.error.errors['task.date'];
              if (dateErrors.includes(invalidFormat)) {
                form.get(formNames.taskGroup).get(formNames.date).setErrors({invalidFormat: true});
              }
            }

            if (error.error.errors['alarm.title'] !== undefined) {
              const titleErrors = error.error.errors['alarm.title'];
              if (titleErrors.includes(required)) {
                form.get(formNames.alarmGroup).get(formNames.title).setErrors({required: true});
              }
              if (titleErrors.includes(invalidFormat)) {
                form.get(formNames.alarmGroup).get(formNames.title).setErrors({invalidFormat: true});
              }
              if (titleErrors.includes(tooLong)) {
                form.get(formNames.alarmGroup).get(formNames.title).setErrors({maxlength: true});
              }
            }

            if (error.error.errors['alarm.content'] !== undefined) {
              const contentErrors = error.error.errors['alarm.content'];
              if (contentErrors.includes(invalidFormat)) {
                form.get(formNames.alarmGroup).get(formNames.content).setErrors({invalidFormat: true});
              }
            }

            let notifications = form.get(formNames.alarmGroup).get(formNames.notifications) as FormArray;
            notifications.controls.forEach(function (notification, index) {
              if (error.error.errors['alarm.notifications' + index] !== undefined) {
                const notificationErrors = error.error.errors['alarm.notifications' + index];
                if (notificationErrors.includes(required)) {
                  notification.setErrors({required: true});
                }
                if (notificationErrors.includes(invalidFormat)) {
                  notification.setErrors({invalidFormat: true});
                }
              }
            });
            return of(null);
          }
        )
      ).subscribe().unsubscribe();
    }).unsubscribe();
    return of(null);
  }

  validatePeriodic(form: AbstractControl): Observable<object> {
    const alarmNotifications = form.get(formNames.notifications) as FormArray;
    const types = form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    const task: PeriodicTaskRequest = {
      alarm: null,
      task: {
        title: form.get(formNames.taskGroup).get(formNames.title).value,
        content: form.get(formNames.taskGroup).get(formNames.content).value,
        start: form.get(formNames.taskGroup).get(formNames.dates).get(formNames.start).value,
        stop: form.get(formNames.taskGroup).get(formNames.dates).get(formNames.stop).value,
        interval: form.get(formNames.taskGroup).get(formNames.interval).value,
        intervalType: form.get(formNames.taskGroup).get(formNames.intervalType).value,
      }
    }
    this.createStore.getAlarmState().subscribe(alarmAssigned => {
        if (alarmAssigned) {
          let notifications: number[] = [];
          alarmNotifications.controls.forEach((notification: FormGroup) => {
            notifications.push(TimeUtils.modifyTime(notification.get(formNames.notificationType).value, notification.get(formNames.notificationTime).value));
          });

          task.alarm = {
            title: form.get(formNames.alarmGroup).get(formNames.title).value,
            content: form.get(formNames.alarmGroup).get(formNames.content).value,
            notificationTypes: types.controls.map((data) => data.value),
            notifications: notifications
          };
        }

        this.httpClient.post<any>(tasksRoutes.validatePeriodic, task).pipe(
          delay(1000),
          map<any, object>(() => null),
          catchError(error => {
              if (error.error.errors['task.title'] !== undefined) {
                const titleErrors = error.error.errors['task.title'];
                if (titleErrors.includes(required)) {
                  form.get(formNames.taskGroup).get(formNames.title).setErrors({required: true});
                }
                if (titleErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.title).setErrors({invalidFormat: true});
                }
                if (titleErrors.includes(tooLong)) {
                  form.get(formNames.taskGroup).get(formNames.title).setErrors({maxlength: true});
                }
              }
              if (error.error.errors['task.content'] !== undefined) {
                const contentErrors = error.error.errors['task.content'];
                if (contentErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.content).setErrors({invalidFormat: true});
                }
              }
              if (error.error.errors['task.mainTask'] !== undefined) {
                const mainTaskErrors = error.error.errors['task.mainTask'];
                if (mainTaskErrors.includes(invalidValue)) {
                  form.get(formNames.taskGroup).get(formNames.search).setErrors({invalidValue: true});
                }
              }

              if (error.error.errors['task.start'] !== undefined) {
                const startDateErrors = error.error.errors['task.start'];
                if (startDateErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.start).setErrors({required: true});
                }
                if (startDateErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.start).setErrors({invalidFormat: true});
                }
              }

              if (error.error.errors['task.stop'] !== undefined) {
                const stopDateErrors = error.error.errors['task.stop'];
                if (stopDateErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.stop).setErrors({invalidFormat: true});
                }
                if (stopDateErrors.includes(invalidValue)) {
                  form.get(formNames.taskGroup).get(formNames.stop).setErrors({invalidValue: true});
                }
              }

              if (error.error.errors['task.interval'] !== undefined) {
                const intervalErrors = error.error.errors['task.interval'];
                if (intervalErrors.includes(required)) {
                  form.get(formNames.taskGroup).get(formNames.interval).setErrors({required: true});
                }
                if (intervalErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.interval).setErrors({invalidFormat: true});
                }
                if (intervalErrors.includes(invalidValue)) {
                  form.get(formNames.taskGroup).get(formNames.interval).setErrors({invalidValue: true});
                }
              }

              if (error.error.errors['task.intervalType'] !== undefined) {
                const intervalTypeErrors = error.error.errors['task.intervalType'];
                if (intervalTypeErrors.includes(required)) {
                  form.get(formNames.taskGroup).get(formNames.intervalType).setErrors({required: true});
                }
                if (intervalTypeErrors.includes(invalidFormat)) {
                  form.get(formNames.taskGroup).get(formNames.intervalType).setErrors({invalidFormat: true});
                }
                if (intervalTypeErrors.includes(invalidValue)) {
                  form.get(formNames.taskGroup).get(formNames.intervalType).setErrors({invalidValue: true});
                }
              }

              if (error.error.errors['alarm.title'] !== undefined) {
                const titleErrors = error.error.errors['alarm.title'];
                if (titleErrors.includes(required)) {
                  form.get(formNames.alarmGroup).get(formNames.title).setErrors({required: true});
                }
                if (titleErrors.includes(invalidFormat)) {
                  form.get(formNames.alarmGroup).get(formNames.title).setErrors({invalidFormat: true});
                }
                if (titleErrors.includes(tooLong)) {
                  form.get(formNames.alarmGroup).get(formNames.title).setErrors({maxlength: true});
                }
              }

              if (error.error.errors['alarm.content'] !== undefined) {
                const contentErrors = error.error.errors['alarm.content'];
                if (contentErrors.includes(invalidFormat)) {
                  form.get(formNames.alarmGroup).get(formNames.content).setErrors({invalidFormat: true});
                }
              }

              let notifications = form.get(formNames.alarmGroup).get(formNames.notifications) as FormArray;
              notifications.controls.forEach(function (notification, index) {
                if (error.error.errors['alarm.notifications' + index] !== undefined) {
                  const notificationErrors = error.error.errors['alarm.notifications' + index];
                  if (notificationErrors.includes(required)) {
                    notification.setErrors({required: true});
                  }
                  if (notificationErrors.includes(invalidFormat)) {
                    notification.setErrors({invalidFormat: true});
                  }
                }
              });
              return of(null);
            }
          )
        ).subscribe().unsubscribe();
      }
    ).unsubscribe();

    return of(null);
  }
}
