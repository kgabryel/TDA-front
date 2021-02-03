import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'shared-errors-container',
  templateUrl: './errors-container.component.html',
  styleUrls: ['./errors-container.component.scss']
})
export class ErrorsContainerComponent implements OnInit {

  @Input() formControl: FormControl;
  @Input() errors: string[];
  @Input() prefix: string;
  @Input() part: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
