import {Component, Input, OnInit} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormGroup} from "@angular/forms";
import {editorConfig} from "../../../../../../config/text-editor.config";
import {formNames} from "../../../../../../core/factories/task.factory";
import {intervalAlarmTypes, Type} from "../../../../../../config/interval-types.config";
import {periodicTaskErrors, PeriodicTaskErrors} from "../../../../../../core/errors/tasks.error";

@Component({
  selector: 'tasks-periodic-task-part',
  templateUrl: './task-part.component.html',
  styleUrls: ['./task-part.component.scss']
})
export class TaskPartComponent implements OnInit {
  public editorConfig: AngularEditorConfig;
  types: Type[];
  @Input() form: FormGroup;
  public formNames;
  public titleLength: number;
  public errors: PeriodicTaskErrors;

  constructor() {
    this.editorConfig = editorConfig;
    this.formNames = formNames;
    this.types = intervalAlarmTypes;
    this.errors = periodicTaskErrors;
  }

  ngOnInit(): void {
    this.titleLength = 0;
    this.form.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
  }
}
