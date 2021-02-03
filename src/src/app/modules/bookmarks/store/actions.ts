import {createAction, props} from '@ngrx/store';
import {Bookmark} from "../../../core/models/bookmark";
import {Update} from "@ngrx/entity";
import {BookmarkRequest} from "../../../core/requests/bookmark.request";

export const bookmarksLoad = createAction(
  '[Bookmarks] Load'
);

export const bookmarksLoadSuccess = createAction(
  '[Bookmarks] Load Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const bookmarksLoadError = createAction(
  '[Bookmarks] Load Error'
);

export const bookmarkAdd = createAction(
  '[Bookmarks] Add',
  props<{ bookmark: BookmarkRequest }>()
);

export const bookmarkAddError = createAction(
  '[Bookmarks] Add Error'
);

export const bookmarkAddSuccess = createAction(
  '[Bookmarks] Add Success',
  props<{ bookmark: Bookmark }>()
);

export const bookmarkDelete = createAction(
  '[Bookmarks] Delete',
  props<{ id: number }>()
);

export const bookmarkDeleteError = createAction(
  '[Bookmarks] Delete Error'
);

export const bookmarkDeleteSuccess = createAction(
  '[Bookmarks] Delete Success',
  props<{ id: number }>()
);
export const bookmarkUpdate = createAction(
  '[Bookmarks] Update',
  props<{ id: number, bookmark: BookmarkRequest }>()
);

export const bookmarkUpdateError = createAction(
  '[Bookmarks] Update Error'
);

export const bookmarkUpdateSuccess = createAction(
  '[Bookmarks] Update Success',
  props<{ bookmark: Update<Bookmark> }>()
);
