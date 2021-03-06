import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {formNames} from "../../../../../core/factories/alarm.factory";
import {Observable} from "rxjs";

@Component({
    selector: 'alarms-single-small-form',
    templateUrl: './small-form.component.html',
    styleUrls: ['./small-form.component.scss']
})
export class SmallFormComponent implements OnInit {
    @Input() form: FormGroup;
    public formNames;

    constructor() {
        this.formNames = formNames;
    }

    ngOnInit(): void {
    }

}
