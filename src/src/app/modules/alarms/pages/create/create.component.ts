import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {notificationTypesLoad} from "../../../../store/actions";
import {State} from "../../../../store/reducers";

@Component({
  selector: 'alarms-pages-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(store: Store<State>) {
    store.dispatch(notificationTypesLoad());
  }

  ngOnInit(): void {
  }

}
