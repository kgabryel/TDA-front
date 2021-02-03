import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {CreateStore} from "../../../store/create/state";
import {formNames} from "../../../../../core/factories/task.factory";

@Component({
  selector: 'tasks-periodic-big-form',
  templateUrl: './big-form.component.html',
  styleUrls: ['./big-form.component.scss']
})
export class BigFormComponent implements OnInit {
  @Input() public form: FormGroup;
  public alarmShowed$: Observable<boolean>;
  private createStore: CreateStore;
  public formNames;

  constructor(createStore: CreateStore) {
    this.createStore = createStore;
    this.formNames = formNames;
  }

  ngOnInit(): void {
    this.alarmShowed$ = this.createStore.getAlarmState();
  }
}
