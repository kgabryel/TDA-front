import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {formNames} from "../../../../core/factories/bookmark.factory";

@Component({
  selector: 'bookmarks-create-form',
  templateUrl: './../form/form.component.html',
  styleUrls: ['./../form/form.component.scss']
})
export class CreateFormComponent extends FormComponent implements OnInit {

  ngOnInit(): void {
    this.form = this.formFactory.getCreateForm();
    this.titleLength = 0;
    this.submit = this.submitForm();
    this.buttonMessage = 'create';
    super.ngOnInit();
  }

  public submitForm(): CallableFunction {
    return () => {
      if (this.form.invalid) {
        return;
      }
      this.bookmarkService.createBookmark(this.form.value, this.store);
      this.clearForm();
      this.formSubmitted.emit();
    }
  }

  private clearForm(): void {
    this.form.reset({
      [formNames.mainGroup]: {
        [formNames.title]: '',
        [formNames.href]: '',
        [formNames.assignedToDashboard]: false,
      },
      [formNames.detailsGroup]: {
        [formNames.textColor]: '#000000',
        [formNames.backgroundColor]: '#ffffff',
      }
    });
  }
}
