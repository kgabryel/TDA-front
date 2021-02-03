import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CreateStore} from "../../../store/create/state";

@Component({
  selector: 'tasks-type-switch',
  templateUrl: './type-switch.component.html',
  styleUrls: ['./type-switch.component.scss']
})
export class TypeSwitchComponent implements OnInit {
  public mainTask$: Observable<boolean>;
  private createStore: CreateStore;

  constructor(createStore: CreateStore) {
    this.createStore = createStore;
  }

  ngOnInit(): void {
    this.mainTask$ = this.createStore.getMainTaskState();
  }

  public changeStatus(event) {
    this.createStore.changeMainTaskState({value: event.checked});
  }
}
