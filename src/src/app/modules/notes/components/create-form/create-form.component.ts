import {Component, OnInit} from '@angular/core';
import {formNames} from "../../../../core/factories/note.factory";
import {noteAdd} from "../../store/actions";
import {NoteRequest} from "../../../../core/requests/note.request";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'notes-create-form',
  templateUrl: './../form/form.component.html',
  styleUrls: ['./../form/form.component.scss']
})
export class CreateFormComponent extends FormComponent implements OnInit {

  ngOnInit(): void {
    this.titleLength = 0;
    this.form = this.formFactory.getCreateForm();
    this.submit = this.submitForm();
    this.buttonMessage = 'create';
    super.ngOnInit();
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
        assignedToDashboard: this.form.get(formNames.assignedToDashboard).value
      };
      this.store.dispatch(noteAdd({note}));
      this.clearForm();
      this.formSubmitted.emit();
    }
  }

  public clearForm(): void {
    this.form.reset({
      [formNames.title]: '',
      [formNames.content]: '',
      [formNames.backgroundColor]: '#ffffff',
      [formNames.textColor]: '#000000',
      [formNames.assignedToDashboard]: false,
    });
  }
}
