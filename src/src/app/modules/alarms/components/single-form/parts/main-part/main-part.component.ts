import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {editorConfig} from "../../../../../../config/text-editor.config";
import {formNames} from "../../../../../../core/factories/alarm.factory";
import {Observable} from "rxjs";
import {singleAlarmErrors, SingleAlarmErrors} from "../../../../../../core/errors/alarms.error";

@Component({
  selector: 'alarms-single-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.scss']
})
export class MainPartComponent implements OnInit {

  @Input() form: FormGroup;
  public editorConfig: AngularEditorConfig;
  public formNames;
  public titleLength: number;
  public errors: SingleAlarmErrors;

  constructor() {
    this.editorConfig = editorConfig;
    this.formNames = formNames;
    this.errors = singleAlarmErrors;
  }

  ngOnInit(): void {
    this.titleLength = 0;
    this.form.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
  }

}
