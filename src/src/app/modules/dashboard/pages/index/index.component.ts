import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {State} from "../../../../store/reducers";
import {taskLoad, taskStatusLoad} from "../../../../store/actions";

@Component({
  selector: 'dashboard-page-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public small$: Observable<boolean>
  private breakpointObserver: BreakpointObserver;
  private store: Store<State>;

  constructor(breakpointObserver: BreakpointObserver, store: Store<State>) {
    this.breakpointObserver = breakpointObserver;
    this.store = store;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 1200px)').subscribe(data => this.small$ = of(data.matches));
    this.store.dispatch(taskStatusLoad());
    this.store.dispatch(taskLoad());
  }

}
