import {Component, Input, OnInit} from '@angular/core';
import {SingleTask, PeriodicTask} from "../../../../core/models/task";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {taskPeriodicDelete} from "../../../../store/actions";
import {PageEvent} from "@angular/material/paginator";
import {pageSizeOptions} from "../../../../config/pagination.config";

@Component({
  selector: 'tasks-task-periodic',
  templateUrl: './task-periodic.component.html',
  styleUrls: ['../../shared/tasks.scss', './task-periodic.component.scss']
})
export class TaskPeriodicComponent implements OnInit {

  @Input() task: PeriodicTask;
  public step: number;
  private statusSheet: MatBottomSheet;
  private store: Store<State>;
  public pageSize: number;
  public pageSizeOptions: number[];
  public selectedTasks: SingleTask[];

  constructor(statusSheet: MatBottomSheet, store: Store<State>) {
    this.statusSheet = statusSheet;
    this.store = store;
    this.pageSize = 5;
    this.pageSizeOptions = pageSizeOptions;
  }

  ngOnInit(): void {
    this.step = -1;
    this.selectedTasks = this.task.tasks.slice(0, this.pageSize);
  }

  public deleteTask() {
    this.store.dispatch(taskPeriodicDelete({id: this.task.id}));
  }

  public changeSection(section: number): void {
    if (this.step === section) {
      this.step = -1;
    } else {
      this.step = section;
    }
  }

  public paginate(event: PageEvent) {
    this.selectedTasks = this.task.tasks.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }
}
