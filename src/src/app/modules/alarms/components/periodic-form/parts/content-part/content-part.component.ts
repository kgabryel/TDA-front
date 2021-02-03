import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {editorConfig} from "../../../../../../config/text-editor.config";
import {formNames} from "../../../../../../core/factories/alarm.factory";
import {periodicAlarmErrors, PeriodicAlarmErrors, singleAlarmErrors} from "../../../../../../core/errors/alarms.error";

@Component({
  selector: 'alarms-periodic-content-part',
  templateUrl: './content-part.component.html',
  styleUrls: ['./content-part.component.scss']
})
export class ContentPartComponent implements OnInit {

  @Input() form: FormGroup;
  public config: AngularEditorConfig;
  public formNames;
  public errors: PeriodicAlarmErrors;

  constructor() {
    this.config = editorConfig;
    this.formNames = formNames;
    this.errors = periodicAlarmErrors;
  }

  ngOnInit(): void {

  }

}
