import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './pages/index/index.component';
import {NotesRoutingModule} from "./notes-routing.module";
import {NewNoteComponent} from './components/new-note/new-note.component';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import {NoteComponent} from './components/note/note.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {NotesEffects} from "./store/effects";
import {key, reducer} from "./store/reducers";
import {NotesService} from "../../core/services/notes/notes.service";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {FormFactory} from "../../core/factories/note.factory";
import {DialogComponent} from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditFormComponent} from './components/edit-form/edit-form.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ResizerService} from "../../core/services/resizer/resizer.service";
import { FormComponent } from './components/form/form.component';
import {NoteValidator} from "../../core/validators/notes/note.validator";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [IndexComponent, NewNoteComponent, CreateFormComponent, NoteComponent, SidenavComponent, DialogComponent, EditFormComponent, FormComponent],
    imports: [
        CommonModule,
        NotesRoutingModule,
        MatSidenavModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        StoreModule.forFeature(key, reducer),
        EffectsModule.forFeature([NotesEffects]),
        AngularEditorModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSlideToggleModule,
        TranslateModule,
    ],
  exports: [
    NoteComponent
  ],
  providers: [
    NotesService,
    FormFactory,
    ResizerService,
    NoteValidator
  ]
})
export class NotesModule {
}
