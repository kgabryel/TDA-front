import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {selectAlarms} from "../../../../store/selectors/alarm";
import {NotificationTimeWrapper, TimeUtils} from "../../../../core/utils/time.utils";
import {
  NextNotificationService,
  NotificationData
} from "../../../../core/services/next-notification/next-notification.service";

@Component({
  selector: 'header-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notification: NotificationData | null
  public time: NotificationTimeWrapper;
  private store: Store<State>

  constructor(store: Store<State>) {
    this.store = store;
  }

  ngOnInit(): void {
    this.notification = null;
    this.store.select(selectAlarms).subscribe(alarms => {
      const service: NextNotificationService = new NextNotificationService(alarms);
      service.find();
      this.notification = service.get();
      if (this.notification !== null) {
        this.time = TimeUtils.modifyDate(this.notification);
      }
    })
  }
}
