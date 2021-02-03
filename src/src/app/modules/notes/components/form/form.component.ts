import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormFactory, formNames} from "../../../../core/factories/note.factory";
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {editorConfig} from "../../../../config/text-editor.config";
import {format} from "date-fns";
import {NoteWrapper} from "../../../../core/data/wrappers.data";
import {notesErrors, NotesErrors} from "../../../../core/errors/notes.error";

@Component({
  selector: 'notes-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() public viewAvailable: EventEmitter<NoteWrapper>;
  protected formFactory: FormFactory;
  protected store: Store<State>;
  public formNames;
  public titleLength: number;
  public editorConfig: AngularEditorConfig;
  public form: FormGroup;
  public submit: CallableFunction;
  public buttonMessage: string;
  public errors: NotesErrors;
  @Output() public formSubmitted: EventEmitter<void>;
  constructor(formFactory: FormFactory, store: Store<State>) {
    this.formSubmitted = new EventEmitter<void>();
    this.formFactory = formFactory;
    this.formNames = formNames;
    this.store = store;
    this.editorConfig = editorConfig;
    this.viewAvailable = new EventEmitter<NoteWrapper>();
    this.errors = notesErrors;
  }

  ngOnInit(): void {
    this.form.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
    this.form.statusChanges.pipe(debounceTime(500)).subscribe(() => {
      this.monitorPreview();
    });
  }

  protected monitorPreview(): void {
    if (this.form.valid) {
      this.emitCorrect();
    } else {
      this.viewAvailable.emit({
        isCorrect: false,
        note: null
      });
    }
  }

  protected emitCorrect(): void {
    this.viewAvailable.emit({
      isCorrect: true,
      note: {
        id: 0,
        title: this.form.get(this.formNames.title).value,
        content: this.form.get(this.formNames.title).value,
        backgroundColor: this.form.get(this.formNames.backgroundColor).value,
        textColor: this.form.get(this.formNames.textColor).value,
        date: this.getDate(),
        assignedToDashboard: false,
      }
    });
  }

  protected getDate(): string {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
