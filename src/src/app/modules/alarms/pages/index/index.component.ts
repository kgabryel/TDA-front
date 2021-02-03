import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {Alarm} from "../../../../core/models/alarm";
import {selectAlarms} from "../../../../store/selectors/alarm";
import {BreakpointObserver} from "@angular/cdk/layout";
import {environment} from "../../../../../environments/environment";
import {State} from "../../../../store/reducers";
import {alarmLoad, notificationTypesLoad} from "../../../../store/actions";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'alarms-pages-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public alarms$: Observable<Alarm[]>;
  private store: Store<State>;
  public small$: Observable<boolean>;
  private breakpointObserver: BreakpointObserver;

  constructor(store: Store<State>, breakpointObserver: BreakpointObserver) {
    this.store = store;
    this.breakpointObserver = breakpointObserver;
  }

  ngOnInit(): void {
    this.store.dispatch(notificationTypesLoad());
    this.store.dispatch(alarmLoad());
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.small$ = of(data.matches));
    this.alarms$ = this.store.select(selectAlarms);
  }

}
