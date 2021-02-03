import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormNotificationService} from "../../../../../../core/services/form-notification/form-notification.service";
import {formNames} from "../../../../../../core/factories/alarm.factory";
import {intervalNotificationTypes, Type} from "../../../../../../config/interval-types.config";
import {PeriodicAlarmErrors, periodicAlarmErrors} from "../../../../../../core/errors/alarms.error";


@Component({
  selector: 'alarms-periodic-notification-part',
  templateUrl: './notification-part.component.html',
  styleUrls: ['./notification-part.component.scss']
})
export class NotificationPartComponent implements OnInit {
  @Input() parentForm: FormGroup;
  private notificationService: FormNotificationService;
  public notifications: FormArray;
  public formNames;
  public types: Type[];
  public errors: PeriodicAlarmErrors;

  constructor(@Inject('periodicFormNotificationService')notificationService: FormNotificationService) {
    this.notificationService = notificationService;
    this.errors = periodicAlarmErrors;
  }

  ngOnInit(): void {
    this.notifications = this.parentForm.get(formNames.notifications) as FormArray;
    this.formNames = formNames;
    this.types = intervalNotificationTypes;
  }

  public addNotification() {
    this.notificationService.addNotification();
  }

  public removeNotification(index: number) {
    this.notificationService.removeNotification(index);
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notifications.controls, event.previousIndex, event.currentIndex);
  }
}
