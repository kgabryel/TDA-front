import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {formNames} from "../../../../../core/factories/alarm.factory";

@Component({
  selector: 'alarms-periodic-big-form',
  templateUrl: './big-form.component.html',
  styleUrls: ['./big-form.component.scss']
})
export class BigFormComponent implements OnInit {
  @Input() form: FormGroup;
  public formNames;

  constructor() {
    this.formNames = formNames;
  }

  ngOnInit(): void {
  }

}
