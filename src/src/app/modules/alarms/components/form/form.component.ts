import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormNotificationService} from "../../../../core/services/form-notification/form-notification.service";
import {Store} from "@ngrx/store";
import {FormFactory, formNames} from "../../../../core/factories/alarm.factory";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {State} from "../../../../store/reducers";
import {smallFormBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'alarms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  public smallForm$: Observable<boolean>;
  protected breakpointObserver: BreakpointObserver;
  protected formNotificationService: FormNotificationService;
  protected notifications: FormArray;
  protected store: Store<State>;
  protected types: FormArray;
  public notificationService: NotificationService;
  public notificationDeleteError: string;

  constructor(
    breakpointObserver: BreakpointObserver,
    formNotificationService: FormNotificationService,
    formFactory: FormFactory,
    store: Store<State>,
    notificationService: NotificationService
  ) {
    this.notificationDeleteError = '';
    this.breakpointObserver = breakpointObserver;
    this.formNotificationService = formNotificationService;
    this.form = formFactory.getForm();
    this.notifications = this.form.get(formNames.notifications) as FormArray;
    this.types = this.form.get(formNames.typesGroup).get(formNames.types) as FormArray;
    this.store = store;
    this.notificationService = notificationService;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(smallFormBreakPoint).subscribe(data => this.smallForm$ = of(data.matches));
    this.formNotificationService.getRemoveState().subscribe(index => {
        if (this.notifications.length == 1) {
          this.notificationService.showMessage(this.notificationDeleteError);
        } else {
          this.notifications.removeAt(index)
        }
      }
    );
  }
}
