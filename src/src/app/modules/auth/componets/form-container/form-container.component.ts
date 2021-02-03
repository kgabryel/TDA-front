import {Component, OnInit} from '@angular/core';
import {ImagesConfig} from "../../../../config/images.config";

@Component({
  selector: 'auth-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  public logoPath: string;

  constructor() {
    this.logoPath = ImagesConfig.logoPath;
  }

  ngOnInit(): void {
  }

}
