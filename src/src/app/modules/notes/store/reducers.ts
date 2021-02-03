import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {Note} from "../../../core/models/note";
import {
  noteAdd, noteAddError,
  noteAddSuccess,
  noteDelete, noteDeleteError,
  noteDeleteSuccess,
  notesLoad, notesLoadError,
  notesLoadSuccess,
  noteUpdate, noteUpdateError,
  noteUpdateSuccess
} from "./actions";


export interface State {
  notes: EntityState<Note>
  loaded: boolean;
}

export const key = 'notes';
export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>();
const initialState: State = {
  notes: adapter.getInitialState(),
  loaded: false
}
export const reducer = createReducer(
  initialState,
  on(notesLoad, (state) => state),
  on(notesLoadError, (state) => state),
  on(notesLoadSuccess, (state, action) => ({
    ...state,
    loaded: true,
    notes: adapter.addMany(action.notes, state.notes)
  })),
  on(noteAdd, (state) => state),
  on(noteAddError, (state) => state),
  on(noteAddSuccess, (state, action) => ({
    ...state,
    notes: adapter.addOne(action.note, state.notes)
  })),
  on(noteDelete, (state) => state),
  on(noteDeleteError, (state) => state),
  on(noteDeleteSuccess, (state, action) => ({
    ...state,
    notes: adapter.removeOne(action.id, state.notes)
  })),
  on(noteUpdate, (state) => state),
  on(noteUpdateError, (state) => state),
  on(noteUpdateSuccess, (state, action) => ({
    ...state,
    notes: adapter.updateOne(action.note, state.notes)
  }))
);
