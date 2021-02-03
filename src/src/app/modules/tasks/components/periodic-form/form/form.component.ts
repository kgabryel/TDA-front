import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormNotificationService} from "../../../../../core/services/form-notification/form-notification.service";
import {pairwise} from "rxjs/operators";
import {formNames, PeriodicFormFactory} from "../../../../../core/factories/task.factory";
import {PeriodicTaskRequest} from "../../../../../core/requests/tasks.request";
import {CreateStore} from "../../../store/create/state";
import {TimeUtils} from "../../../../../core/utils/time.utils";
import {Store} from "@ngrx/store";
import {State} from "../../../../../store/reducers";
import {tasksPeriodicCreate} from "../../../../../store/actions";
import {environment} from "../../../../../../environments/environment";
import {smallFormBreakPoint} from "../../../../../config/sizes.config";

@Component({
  selector: 'tasks-periodic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public alarmShowed: boolean;
  public form: FormGroup;
  private notifications: FormArray;
  public smallForm$: Observable<boolean>;
  private breakpointObserver: BreakpointObserver;
  private notificationService: FormNotificationService;
  private createStore: CreateStore;
  private types: FormArray;
  private store: Store<State>;

  constructor(@Inject('periodicFormNotificationService')notificationService: FormNotificationService, breakpointObserver: BreakpointObserver, formFactory: PeriodicFormFactory, createStore: CreateStore, store: Store<State>) {
    this.form = formFactory.getForm();
    this.notifications = this.form.get(formNames.notifications) as FormArray;
    this.alarmShowed = true;
    this.breakpointObserver = breakpointObserver;
    this.notificationService = notificationService;
    this.createStore = createStore;
    this.types = this.form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    this.store = store;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(smallFormBreakPoint).subscribe(data => this.smallForm$ = of(data.matches));
    this.notificationService.getAddState().subscribe(() =>
      this.notifications.push(
        new FormGroup({
          [formNames.notificationType]: new FormControl(),
          [formNames.notificationTime]: new FormControl()
        })
      )
    );

    this.notificationService.getRemoveState().subscribe(index =>
      this.notifications.removeAt(index)
    );

    this.form.get(formNames.taskGroup).get(formNames.title).valueChanges.pipe(pairwise()).subscribe(([previousValue, actualValue]) => {
      const titleValue = this.form.get(formNames.alarmGroup).get(formNames.title).value;
      if (titleValue === '' || titleValue === previousValue) {
        this.form.get(formNames.alarmGroup).get(formNames.title).setValue(actualValue);
      }
    });

    this.form.get(formNames.taskGroup).get(formNames.content).valueChanges.pipe(pairwise()).subscribe(([previousValue, actualValue]) => {
      const contentValue = this.form.get(formNames.alarmGroup).get(formNames.content).value;
      if (contentValue === '' || contentValue === previousValue) {
        this.form.get(formNames.alarmGroup).get(formNames.content).setValue(actualValue);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const task: PeriodicTaskRequest = {
      alarm: null,
      task: {
        title: this.form.get(formNames.taskGroup).get(formNames.title).value,
        content: this.form.get(formNames.taskGroup).get(formNames.content).value,
        start: this.form.get(formNames.taskGroup).get(formNames.dates).get(formNames.start).value,
        stop: this.form.get(formNames.taskGroup).get(formNames.dates).get(formNames.stop).value,
        interval: this.form.get(formNames.taskGroup).get(formNames.interval).value,
        intervalType: this.form.get(formNames.taskGroup).get(formNames.intervalType).value,
      }
    }
    this.createStore.getAlarmState().subscribe(alarmAssigned => {
      if (alarmAssigned) {
        let notifications: number[] = [];
        this.notifications.controls.forEach((notification: FormGroup) => {
          notifications.push(TimeUtils.modifyTime(notification.get(formNames.notificationType).value, notification.get(formNames.notificationTime).value));
        });

        task.alarm = {
          title: this.form.get(formNames.alarmGroup).get(formNames.title).value,
          content: this.form.get(formNames.alarmGroup).get(formNames.content).value,
          notificationTypes: this.types.controls.map((data) => data.value),
          notifications: notifications
        };
      }
      this.store.dispatch(tasksPeriodicCreate({task}));
    }).unsubscribe();
  }

  public changeStatus(event: boolean) {
    this.alarmShowed = event;
  }
}
