import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {FormNotificationService} from "../../../../../../core/services/form-notification/form-notification.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {formNames} from "../../../../../../core/factories/alarm.factory";
import {SingleAlarmErrors, singleAlarmErrors} from "../../../../../../core/errors/alarms.error";

@Component({
  selector: 'alarms-single-notification-part',
  templateUrl: './notification-part.component.html',
  styleUrls: ['./notification-part.component.scss']
})
export class NotificationPartComponent implements OnInit {

  public notifications: FormArray;
  @Input() parentForm: FormGroup;
  private notificationService: FormNotificationService;
  public errors: SingleAlarmErrors;
  public formNames;

  constructor(@Inject('singleFormNotificationService')notificationService: FormNotificationService) {
    this.notificationService = notificationService;
    this.formNames = formNames;
    this.errors = singleAlarmErrors;
  }

  ngOnInit(): void {
    this.notifications = this.parentForm.get(formNames.notifications) as FormArray;
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
