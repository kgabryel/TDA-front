import {Component, Input, OnInit} from '@angular/core';
import {StatusSheetComponent} from "../../../tasks/components/status-sheet/status-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {Task} from "../../../../core/models/task";
import {TaskStatus} from "../../../../core/models/task-status";
import {combineLatest, Observable} from "rxjs";
import {selectDoneStatus, selectStatus} from "../../../../store/selectors/task-status";
import {alarmLoad, taskChangeStatus} from "../../../../store/actions";
import {map} from "rxjs/operators";
import {selectSubtasks} from "../../../../store/selectors/task";
import {NotificationService} from "../../../../core/services/notification/notification.service";

@Component({
  selector: 'menu-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  private statusSheet: MatBottomSheet;
  @Input() public task: Task;
  public status$: Observable<TaskStatus>;
  private store: Store<State>;
  private notificationService: NotificationService;

  constructor(statusSheet: MatBottomSheet, store: Store<State>, notificationService: NotificationService) {
    this.statusSheet = statusSheet;
    this.store = store;
    this.notificationService = notificationService;
  }

  ngOnInit(): void {
    this.status$ = this.store.select(selectStatus(this.task.status));
  }

  public openStatusSheet() {
    const subtasks$ = this.store.select(selectSubtasks(this.task.id));
    combineLatest(this.store.select(selectDoneStatus), subtasks$)
      .pipe(map(([doneStatus, tasks]) => {
        let subtasksDone = true;
        tasks.forEach((task: Task) => {
          if (task.status !== doneStatus) {
            subtasksDone = false;
          }
        });
        return {subtasksDone, doneStatus}
      }))
      .subscribe((statuses) => {
        const sheetRef = this.statusSheet.open(StatusSheetComponent, {
          data: {without: this.task.status},
        });
        sheetRef.afterDismissed().subscribe(status => {
          if (status === undefined) {
            return;
          }
          if (!statuses.subtasksDone && status == statuses.doneStatus) {
            this.notificationService.showMessage('tasks.changeStatusError');
          } else {
            this.store.dispatch(taskChangeStatus({
              id: this.task.id,
              status: status
            }));
            this.store.dispatch(alarmLoad());
          }
        });
      }).unsubscribe();
  }
}
