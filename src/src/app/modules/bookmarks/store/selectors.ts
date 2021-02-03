import {adapter, key, State} from './reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Bookmark} from "../../../core/models/bookmark";

const selectState = createFeatureSelector<State>(key);
const bookmarksState = createSelector(
  selectState,
  (selectState: State) => selectState.bookmarks
);
const {
  selectAll
} = adapter.getSelectors(bookmarksState);
export const selectBookmarks = selectAll;
export const selectAssignedToDashboard = createSelector(
  selectAll,
  (bookmarks: Bookmark[]) => (bookmarks.filter((bookmark: Bookmark) => bookmark.assignedToDashboard))
);
