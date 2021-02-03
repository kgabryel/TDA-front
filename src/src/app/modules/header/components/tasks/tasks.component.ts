import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {selectTasksToDone} from "../../../../store/selectors/task";
import {PathUtils} from "../../../../core/utils/path.utils";
import {RoutingConfig} from "../../../../config/routing.config";

@Component({
  selector: 'header-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  private store: Store<State>;
  public length: number;
  public toDoPath: string;

  constructor(store: Store<State>) {
    this.toDoPath = PathUtils.concatPath(RoutingConfig.tasks, RoutingConfig.toDo);
    this.length = 0;
    this.store = store;
  }

  ngOnInit(): void {
    this.store.select(selectTasksToDone).subscribe(tasks => this.length = tasks.length);
  }

}
