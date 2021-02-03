import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../../../core/models/note";
import {formNames} from "../../../../core/factories/note.factory";
import {NoteRequest} from "../../../../core/requests/note.request";
import {noteUpdate} from "../../store/actions";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'notes-edit-form',
  templateUrl: './../form/form.component.html',
  styleUrls: ['./../form/form.component.scss']
})
export class EditFormComponent extends FormComponent implements OnInit {

  @Input() public note: Note;

  ngOnInit(): void {
    this.titleLength = this.note.title.length;
    this.form = this.formFactory.getEditForm(this.note);
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
      const note: NoteRequest = {
        title: this.form.get(formNames.title).value,
        content: this.form.get(formNames.content).value,
        textColor: this.form.get(formNames.textColor).value,
        backgroundColor: this.form.get(formNames.backgroundColor).value,
        assignedToDashboard: this.form.get(this.formNames.assignedToDashboard).value
      };
      this.store.dispatch(noteUpdate({
        id: this.note.id,
        note: note
      }));
      this.formSubmitted.emit();
    }
  }

  protected getDate(): string {
    return this.note.date;
  }
}
