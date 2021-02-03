import {Component, Input, OnInit} from '@angular/core';
import {SingleTask, Task} from "../../../../core/models/task";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {StatusSheetComponent} from "../status-sheet/status-sheet.component";
import {Observable, combineLatest, of} from "rxjs";
import {TaskStatus} from "../../../../core/models/task-status";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {selectSubtasks,} from "../../../../store/selectors/task";
import {selectDoneStatus, selectStatus} from "../../../../store/selectors/task-status";
import {map} from "rxjs/operators";
import {NotificationService} from "../../../../core/services/notification/notification.service";
import {alarmLoad, taskChangeStatus, taskSingleDelete} from "../../../../store/actions";
import {PageEvent} from "@angular/material/paginator";
import {pageSizeOptions} from "../../../../config/pagination.config";

@Component({
  selector: 'tasks-task-single',
  templateUrl: './task-single.component.html',
  styleUrls: ['../../shared/tasks.scss', './task-single.component.scss']
})
export class TaskSingleComponent implements OnInit {

  @Input() task: SingleTask;
  public step: number;
  private statusSheet: MatBottomSheet;
  public status$: Observable<TaskStatus>;
  private store: Store<State>;
  public subtasks$: Observable<Task[]>;
  public doneTasks$: Observable<number>;
  public progress$: Observable<number>;
  private notificationService: NotificationService;
  public pageSize: number;
  public pageSizeOptions: number[];
  public subtasksLength: number;
  public selectedSubtasks: Task[];

  constructor(statusSheet: MatBottomSheet, store: Store<State>, notificationService: NotificationService) {
    this.statusSheet = statusSheet;
    this.store = store;
    this.notificationService = notificationService;
    this.pageSize = 5;
    this.pageSizeOptions = pageSizeOptions;
  }

  ngOnInit(): void {
    this.step = -1;
    this.status$ = this.store.select(selectStatus(this.task.status));
    this.subtasks$ = this.store.select(selectSubtasks(this.task.id));
    this.subtasks$.subscribe(tasks => this.selectedSubtasks = tasks.slice(0, this.pageSize)).unsubscribe();
    this.store.select(selectDoneStatus).subscribe(status =>
      this.doneTasks$ = this.subtasks$.pipe(map(tasks => {
        let count = 0;
        this.subtasksLength = tasks.length;
        tasks.forEach(function (task: Task) {
          if (task.status === status) {
            count++;
          }
        })
        return count;
      })));
    this.progress$ = combineLatest(this.doneTasks$, this.subtasks$).pipe(map(([done, subtasks]) =>
      (done / subtasks.length) * 100
    ));
  }

  public changeSection(section: number): void {
    if (this.step === section) {
      this.step = -1;
    } else {
      this.step = section;
    }
  }

  public deleteTask() {
    this.store.dispatch(taskSingleDelete({id: this.task.id}));
  }

  public openStatusSheet() {
    combineLatest(this.store.select(selectDoneStatus), this.subtasks$)
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

  public paginate(event: PageEvent) {
    this.subtasks$.subscribe(tasks => this.selectedSubtasks = tasks.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize)).unsubscribe();
  }
}
