import {createAction, props} from '@ngrx/store';
import {Note} from "../../../core/models/note";
import {NoteRequest} from "../../../core/requests/note.request";
import {Update} from "@ngrx/entity";

export const notesLoad = createAction(
  '[Notes] Load'
);

export const notesLoadError = createAction(
  '[Notes] Load Error'
);

export const notesLoadSuccess = createAction(
  '[Notes] Load Success',
  props<{ notes: Note[] }>()
);

export const noteAdd = createAction(
  '[Notes] Add',
  props<{ note: NoteRequest }>()
);

export const noteAddError = createAction(
  '[Notes] Add Error'
);

export const noteAddSuccess = createAction(
  '[Notes] Add Success',
  props<{ note: Note }>()
);

export const noteDelete = createAction(
  '[Notes] Delete',
  props<{ id: number }>()
);

export const noteDeleteError = createAction(
  '[Notes] Delete Error'
);

export const noteDeleteSuccess = createAction(
  '[Notes] Delete Success',
  props<{ id: number }>()
);

export const noteUpdate = createAction(
  '[Notes] Update',
  props<{ id: number, note: NoteRequest }>()
);

export const noteUpdateError = createAction(
  '[Notes] Update Error'
);

export const noteUpdateSuccess = createAction(
  '[Notes] Update Success',
  props<{ note: Update<Note> }>()
);
