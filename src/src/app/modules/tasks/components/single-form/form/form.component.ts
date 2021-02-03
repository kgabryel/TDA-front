import {Component, Inject, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {pairwise} from "rxjs/operators";
import {FormNotificationService} from "../../../../../core/services/form-notification/form-notification.service";
import {SingleFormFactory, formNames} from "../../../../../core/factories/task.factory";
import {SingleTaskRequest} from "../../../../../core/requests/tasks.request";
import {Store} from "@ngrx/store";
import {State} from "../../../../../store/reducers";
import {CreateStore} from "../../../store/create/state";
import {tasksSingleCreate} from "../../../../../store/actions";
import {smallFormBreakPoint} from "../../../../../config/sizes.config";

@Component({
  selector: 'tasks-single-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  private notifications: FormArray;
  public smallForm$: Observable<boolean>;
  private breakpointObserver: BreakpointObserver;
  private notificationService: FormNotificationService;
  public formNames;
  private store: Store<State>;
  private createStore: CreateStore;
  private types: FormArray;

  constructor(@Inject('singleFormNotificationService')notificationService: FormNotificationService, breakpointObserver: BreakpointObserver, formFactory: SingleFormFactory, store: Store<State>, createStore: CreateStore) {
    this.form = formFactory.getForm();
    this.formNames = formNames;
    this.notifications = this.form.get(formNames.notifications) as FormArray;
    this.types = this.form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    this.breakpointObserver = breakpointObserver;
    this.notificationService = notificationService;
    this.store = store;
    this.createStore = createStore;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(smallFormBreakPoint).subscribe(data => this.smallForm$ = of(data.matches));
    this.notificationService.getAddState().subscribe(() =>
      this.notifications.push(new FormControl())
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
    const task: SingleTaskRequest = {
      alarm: null,
      task: {
        title: this.form.get(formNames.taskGroup).get(formNames.title).value,
        content: this.form.get(formNames.taskGroup).get(formNames.content).value,
        date: (new Date(this.form.get(formNames.taskGroup).get(formNames.date).value)),
        mainTask: this.form.get(formNames.taskGroup).get(formNames.search).value?.id
      }
    };
    this.createStore.getAlarmState().subscribe(alarmAssigned => {
      if (alarmAssigned) {
        task.alarm = {
          title: this.form.get(formNames.alarmGroup).get(formNames.title).value,
          content: this.form.get(formNames.alarmGroup).get(formNames.content).value,
          notifications: this.notifications.controls.map(data => new Date(data.value)),
          notificationTypes: this.types.controls.map((data) => data.value),
        }
      }
      this.store.dispatch(tasksSingleCreate({task}));
    }).unsubscribe();
  }
}
