import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {formNames} from "../../../../../../core/factories/alarm.factory";
import {intervalAlarmTypes, Type} from "../../../../../../config/interval-types.config";
import {PeriodicAlarmErrors, periodicAlarmErrors} from "../../../../../../core/errors/alarms.error";

@Component({
  selector: 'alarms-periodic-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.scss']
})
export class MainPartComponent implements OnInit {

  @Input() form: FormGroup;
  public formNames;
  types: Type[];
  public titleLength: number;
  public errors: PeriodicAlarmErrors;

  constructor() {
    this.formNames = formNames;
    this.errors = periodicAlarmErrors;
  }

  ngOnInit(): void {
    this.titleLength = 0;
    this.types = intervalAlarmTypes;
    this.form.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
  }
}
