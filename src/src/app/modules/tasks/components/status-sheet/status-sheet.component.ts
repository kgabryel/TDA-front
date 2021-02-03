import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {State} from "../../../../store/reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {TaskStatus} from "../../../../core/models/task-status";
import {selectTaskStatuses} from "../../../../store/selectors/task-status";

@Component({
  selector: 'app-status-sheet',
  templateUrl: './status-sheet.component.html',
  styleUrls: ['./status-sheet.component.scss']
})
export class StatusSheetComponent implements OnInit {

  public inactive: number;
  private bottomSheetRef: MatBottomSheetRef<StatusSheetComponent>
  private store: Store<State>;
  public taskStatuses$: Observable<TaskStatus[]>

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) data: { without: number }, bottomSheetRef: MatBottomSheetRef<StatusSheetComponent>, store: Store<State>) {
    this.inactive = data.without;
    this.bottomSheetRef = bottomSheetRef;
    this.store = store;
  }

  ngOnInit(): void {
    this.taskStatuses$ = this.store.select(selectTaskStatuses);
  }

  changeStatus(status: number): void {
    this.bottomSheetRef.dismiss(status);
  }
}
