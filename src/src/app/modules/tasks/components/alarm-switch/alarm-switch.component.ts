import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CreateStore} from "../../store/create/state";

@Component({
  selector: 'tasks-alarm-switch',
  templateUrl: './alarm-switch.component.html',
  styleUrls: ['./alarm-switch.component.scss']
})
export class AlarmSwitchComponent implements OnInit {

  public checked$: Observable<boolean>;
  private createStore: CreateStore;

  constructor(createStore: CreateStore) {
    this.createStore = createStore;
  }

  ngOnInit(): void {
    this.checked$ = this.createStore.getAlarmState();
  }

  public changeStatus(event) {
    this.createStore.changeAlertState({value: event.checked});
  }
}
