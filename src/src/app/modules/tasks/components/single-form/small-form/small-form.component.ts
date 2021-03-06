import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {CreateStore} from "../../../store/create/state";
import {formNames} from "../../../../../core/factories/task.factory";

@Component({
  selector: 'tasks-single-small-form',
  templateUrl: './small-form.component.html',
  styleUrls: ['./small-form.component.scss']
})
export class SmallFormComponent implements OnInit {

  @Input() form: FormGroup;
  public alarmShowed$: Observable<boolean>;
  public mainTask$: Observable<boolean>;
  private createStore: CreateStore;
  public formNames;

  constructor(createStore: CreateStore) {
    this.createStore = createStore;
    this.formNames = formNames;
  }

  ngOnInit(): void {
    this.alarmShowed$ = this.createStore.getAlarmState();
    this.mainTask$ = this.createStore.getMainTaskState();
  }
}
