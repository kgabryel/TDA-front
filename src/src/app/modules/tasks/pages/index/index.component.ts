import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from '../../../../core/models/task';
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {taskLoad} from "../../../../store/actions";
import {selectMainTasks} from "../../../../store/selectors/task";
import {BreakpointObserver} from "@angular/cdk/layout";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'tasks-pages-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public tasks$: Observable<Task[]>
  private store: Store<State>;
  private breakpointObserver: BreakpointObserver;
  public small$: Observable<boolean>;

  constructor(store: Store<State>, breakpointObserver: BreakpointObserver) {
    this.store = store;
    this.breakpointObserver = breakpointObserver;
  }

  ngOnInit(): void {
    this.store.dispatch(taskLoad());
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.small$ = of(data.matches));
    this.tasks$ = this.store.select(selectMainTasks);
  }
}
