import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {alarmLoad, taskLoad, taskStatusLoad} from "../../../../store/actions";
import {State} from "../../../../store/reducers";

@Component({
  selector: 'main-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(store: Store<State>) {
    store.dispatch(alarmLoad());
    store.dispatch(taskStatusLoad());
    store.dispatch(taskLoad());
  }

  ngOnInit(): void {
  }

}
