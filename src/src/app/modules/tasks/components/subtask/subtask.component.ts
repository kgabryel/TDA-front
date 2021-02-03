import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../../core/models/task';
import {StatusSheetComponent} from "../status-sheet/status-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {Observable} from "rxjs";
import {TaskStatus} from "../../../../core/models/task-status";
import {selectStatus} from "../../../../store/selectors/task-status";
import {alarmLoad, taskChangeStatus} from "../../../../store/actions";

@Component({
  selector: 'tasks-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {

  @Input() task: Task;
  private statusSheet: MatBottomSheet;
  public status$: Observable<TaskStatus>;
  private store: Store<State>;

  constructor(statusSheet: MatBottomSheet, store: Store<State>) {
    this.statusSheet = statusSheet;
    this.store = store;
  }

  ngOnInit(): void {
    this.status$ = this.store.select(selectStatus(this.task.status));
  }

  public openStatusSheet() {
    const sheetRef = this.statusSheet.open(StatusSheetComponent, {
      data: {without: this.task.status},
    });
    sheetRef.afterDismissed().subscribe(status => {
      if (status !== undefined) {
        this.store.dispatch(taskChangeStatus({
          id: this.task.id,
          status: status
        }));
        this.store.dispatch(alarmLoad());
      }
    });
  }
}
