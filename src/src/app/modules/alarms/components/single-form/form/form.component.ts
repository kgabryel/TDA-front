import {Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {FormNotificationService} from "../../../../../core/services/form-notification/form-notification.service";
import {formNames, SingleFormFactory} from "../../../../../core/factories/alarm.factory";
import {SingleAlarmRequest} from "../../../../../core/requests/alarms.request";
import {Store} from "@ngrx/store";
import {alarmsSingleCreate} from "../../../../../store/actions";
import {FormComponent as AbstractFormComponent} from "../../form/form.component";
import {FormControl, Validators} from "@angular/forms";
import {NotificationService} from "../../../../../core/services/notification/notification.service";
import {State} from "../../../../../store/reducers";

@Component({
  selector: 'alarms-single-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../../form/form.component.scss']
})
export class FormComponent extends AbstractFormComponent implements OnInit {
  public smallForm$: Observable<boolean>;

  constructor(
    @Inject('singleFormNotificationService')formNotificationService: FormNotificationService,
    breakpointObserver: BreakpointObserver,
    formFactory: SingleFormFactory,
    store: Store<State>,
    notificationService: NotificationService
  ) {
    super(breakpointObserver, formNotificationService, formFactory, store, notificationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.formNotificationService.getAddState().subscribe(() =>
      this.notifications.push(new FormControl('', [Validators.required]))
    );
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }
    const alarm: SingleAlarmRequest = {
      title: this.form.get(formNames.mainGroup).get(formNames.title).value,
      content: this.form.get(formNames.mainGroup).get(formNames.content).value,
      notificationTypes: this.types.controls.map((data) => data.value),
      notifications: this.notifications.controls.map(data => (new Date(data.value))),
    };
    this.store.dispatch(alarmsSingleCreate({alarm}));
  }
}
