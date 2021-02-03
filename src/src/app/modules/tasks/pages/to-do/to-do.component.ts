import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from "../../../../core/models/task";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {BreakpointObserver} from "@angular/cdk/layout";
import {taskLoad} from "../../../../store/actions";
import {environment} from "../../../../../environments/environment";
import {selectTasksToDone} from "../../../../store/selectors/task";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'tasks-pages-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  public tasks$: Observable<Task[]>
  private store: Store<State>;
  private breakpointObserver: BreakpointObserver;
  public small$: Observable<boolean>;

  constructor(store: Store<State>, breakpointObserver: BreakpointObserver) {
    this.store = store;
    this.breakpointObserver = breakpointObserver;
    this.store.dispatch(taskLoad());
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.small$ = of(data.matches));
    this.tasks$ = this.store.select(selectTasksToDone);
  }

}
