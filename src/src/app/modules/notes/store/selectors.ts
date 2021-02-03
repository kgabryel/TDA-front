import {adapter, key, State} from './reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Note} from "../../../core/models/note";

const selectState = createFeatureSelector<State>(key);
const notesState = createSelector(
  selectState,
  (selectState: State) => selectState.notes
);
const {
  selectAll
} = adapter.getSelectors(notesState);
export const selectNotes = selectAll;

export const selectAssignedToDashboard = createSelector(
  selectAll,
  (notes: Note[]) => (notes.filter((note: Note) => note.assignedToDashboard))
);
