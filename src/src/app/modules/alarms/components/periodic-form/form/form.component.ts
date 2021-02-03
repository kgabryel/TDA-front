import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {formNames, PeriodicFormFactory} from "../../../../../core/factories/alarm.factory";
import {FormNotificationService} from "../../../../../core/services/form-notification/form-notification.service";
import {TimeUtils} from "../../../../../core/utils/time.utils";
import {PeriodicAlarmRequest} from "../../../../../core/requests/alarms.request";
import {alarmsPeriodicCreate} from "../../../../../store/actions";
import {Store} from "@ngrx/store";
import {FormComponent as AbstractFormComponent} from "../../form/form.component";
import {NotificationService} from "../../../../../core/services/notification/notification.service";
import {State} from "../../../../../store/reducers";

@Component({
  selector: 'alarms-periodic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../../form/form.component.scss']
})
export class FormComponent extends AbstractFormComponent implements OnInit {

  public smallForm$: Observable<boolean>;

  constructor(
    @Inject('periodicFormNotificationService')formNotificationService: FormNotificationService,
    breakpointObserver: BreakpointObserver,
    formFactory: PeriodicFormFactory,
    store: Store<State>,
    notificationService: NotificationService
  ) {
    super(breakpointObserver, formNotificationService, formFactory, store, notificationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.formNotificationService.getAddState().subscribe(() =>
      this.notifications.push(new FormGroup({
        [formNames.notificationTime]: new FormControl('', [Validators.required]),
        [formNames.notificationType]: new FormControl('', [Validators.required]),
      }))
    );
  }

  public submit() {
    if(this.form.invalid){
      return;
    }
    let notifications: number[] = [];
    this.notifications.controls.forEach((notification: FormGroup) => {
      notifications.push(TimeUtils.modifyTime(notification.get(formNames.notificationType).value, notification.get(formNames.notificationTime).value));
    });
    const alarm: PeriodicAlarmRequest = {
      title: this.form.get(formNames.mainGroup).get(formNames.title).value,
      content: this.form.get(formNames.contentGroup).get(formNames.content).value,
      notificationTypes: this.types.controls.map((data) => data.value),
      notifications: notifications,
      start: this.form.get(formNames.mainGroup).get(formNames.dates).get(formNames.start).value,
      stop: this.form.get(formNames.mainGroup).get(formNames.dates).get(formNames.stop).value,
      interval: this.form.get(formNames.mainGroup).get(formNames.interval).value,
      intervalType: this.form.get(formNames.mainGroup).get(formNames.intervalType).value,
    };
    this.store.dispatch(alarmsPeriodicCreate({alarm}));
  }
}
