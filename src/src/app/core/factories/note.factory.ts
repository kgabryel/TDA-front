import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Note} from "../models/note";
import {NoteValidator} from "../validators/notes/note.validator";

export enum formNames {
  title = 'title',
  content = 'content',
  backgroundColor = 'backgroundColor',
  textColor = 'textColor',
  assignedToDashboard = 'assignedToDashboard'
}

export interface FormData {
  [formNames.title]: string;
  [formNames.content]: string;
  [formNames.backgroundColor]: string;
  [formNames.textColor]: string;
  [formNames.assignedToDashboard]: string;
}

@Injectable()
export class FormFactory {
  private readonly noteValidator: NoteValidator;

  public constructor(noteValidator: NoteValidator) {
    this.noteValidator = noteValidator;
  }

  public getCreateForm(): FormGroup {
    return new FormGroup({
      [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      [formNames.content]: new FormControl('', [Validators.required]),
      [formNames.backgroundColor]: new FormControl('#ffffff', [Validators.required]),
      [formNames.textColor]: new FormControl('#000000', [Validators.required]),
      [formNames.assignedToDashboard]: new FormControl(false, [Validators.required]),
    }, null, [this.noteValidator.validate.bind(this.noteValidator)]);
  }

  public getEditForm(note: Note): FormGroup {
    return new FormGroup({
      [formNames.title]: new FormControl(note.title, [Validators.required, Validators.maxLength(100)]),
      [formNames.content]: new FormControl(note.content, [Validators.required]),
      [formNames.backgroundColor]: new FormControl(note.backgroundColor, [Validators.required]),
      [formNames.textColor]: new FormControl(note.textColor, [Validators.required]),
      [formNames.assignedToDashboard]: new FormControl(note.assignedToDashboard, [Validators.required]),
    }, null, [this.noteValidator.validate.bind(this.noteValidator)]);
  }
}
