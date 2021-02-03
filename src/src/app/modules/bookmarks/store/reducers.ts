import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {Bookmark} from "../../../core/models/bookmark";
import {
  bookmarkAdd,
  bookmarkAddSuccess,
  bookmarkDelete,
  bookmarkDeleteSuccess, bookmarkAddError,
  bookmarksLoad, bookmarksLoadError,
  bookmarksLoadSuccess, bookmarkUpdate, bookmarkUpdateSuccess, bookmarkDeleteError, bookmarkUpdateError
} from "./actions";

export interface State {
  bookmarks: EntityState<Bookmark>
  loaded: boolean;
}

export const key = 'bookmarks';
export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();
const initialState: State = {
  bookmarks: adapter.getInitialState(),
  loaded: false
}
export const reducer = createReducer(
  initialState,
  on(bookmarksLoad, (state) => state),
  on(bookmarksLoadError, (state) => state),
  on(bookmarksLoadSuccess, (state, action) => ({
    ...state,
    loaded: true,
    bookmarks: adapter.addMany(action.bookmarks, state.bookmarks)
  })),
  on(bookmarkAdd, (state) => state),
  on(bookmarkAddError, (state) => state),
  on(bookmarkAddSuccess, (state, action) => ({
    ...state,
    bookmarks: adapter.addOne(action.bookmark, state.bookmarks)
  })),
  on(bookmarkDelete, (state) => state),
  on(bookmarkDeleteError, (state) => state),
  on(bookmarkDeleteSuccess, (state, action) => ({
    ...state,
    bookmarks: adapter.removeOne(action.id, state.bookmarks)
  })),
  on(bookmarkUpdate, (state) => state),
  on(bookmarkUpdateError, (state) => state),
  on(bookmarkUpdateSuccess, (state, action) => ({
    ...state,
    bookmarks: adapter.updateOne(action.bookmark, state.bookmarks)
  }))
);
