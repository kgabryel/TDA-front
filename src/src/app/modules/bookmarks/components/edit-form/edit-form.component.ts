import {Component, Input, OnInit} from '@angular/core';
import {Bookmark} from "../../../../core/models/bookmark";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'bookmarks-edit-form',
  templateUrl: './../form/form.component.html',
  styleUrls: ['./../form/form.component.scss']
})
export class EditFormComponent extends FormComponent implements OnInit {
  @Input() public bookmark: Bookmark;

  ngOnInit(): void {
    this.form = this.formFactory.getEditForm(this.bookmark);
    this.titleLength = this.bookmark.title.length;
    this.submit = this.submitForm();
    this.buttonMessage = 'update';
    super.ngOnInit();
    this.emitCorrect();
  }

  public submitForm(): CallableFunction {
    return () => {
      if (this.form.invalid) {
        return;
      }
      this.bookmarkService.updateBookmark(this.bookmark.id, this.form.value, this.store);
      this.formSubmitted.emit();
    }
  }
}
