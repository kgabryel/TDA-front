import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {BookmarksService} from "../../../core/services/bookmarks/bookmarks.service";
import {NotificationService} from "../../../core/services/notification/notification.service";
import {
  bookmarkAdd, bookmarkAddError,
  bookmarkAddSuccess,
  bookmarkDelete, bookmarkDeleteError,
  bookmarkDeleteSuccess,
  bookmarksLoad, bookmarksLoadError,
  bookmarksLoadSuccess, bookmarkUpdate, bookmarkUpdateError, bookmarkUpdateSuccess
} from "./actions";
import {Update} from "@ngrx/entity";
import {Bookmark} from "../../../core/models/bookmark";
import {of} from "rxjs";

@Injectable()
export class BookmarksEffects {

  private actions: Actions;
  private bookmarkService: BookmarksService;
  private notificationService: NotificationService;
  loadBookmarks;
  addBookmarks;
  deleteBookmarks;
  updateBookmark;

  constructor(
    actions: Actions,
    bookmarkService: BookmarksService,
    notificationService: NotificationService,
  ) {
    this.actions = actions;
    this.bookmarkService = bookmarkService;
    this.notificationService = notificationService;
    this.createLoadEffect();
    this.createAddEffect();
    this.createDeleteEffect();
    this.createUpdateEffect();
  }

  private createLoadEffect() {
    this.loadBookmarks = createEffect(() => this.actions.pipe(
      ofType(bookmarksLoad),
      mergeMap((() => this.bookmarkService.getAll().pipe(
        map((bookmarks => bookmarksLoadSuccess({bookmarks}))),
        catchError((error)=>{
          this.notificationService.showError(error.status);
          return of(bookmarksLoadError())
        })
      )))
    ));
  }

  private createAddEffect() {
    this.addBookmarks = createEffect(() =>
      this.actions.pipe(
        ofType(bookmarkAdd),
        mergeMap(action => this.bookmarkService.add(action.bookmark).pipe(
          tap(() => this.notificationService.showMessage('bookmarks.addMessage')),
          map((bookmark => {
            return bookmarkAddSuccess({bookmark})
          })),
          catchError((error)=>{
            this.notificationService.showError(error.status);
            return of(bookmarkAddError())
          })
        ))
      ));
  }

  private createDeleteEffect() {
    this.deleteBookmarks = createEffect(() => this.actions.pipe(
      ofType(bookmarkDelete),
      mergeMap(((action) => this.bookmarkService.delete(action.id).pipe(
        tap(() => this.notificationService.showMessage('bookmarks.deleteMessage')),
        map((id => {
          return bookmarkDeleteSuccess({id})
        })),
        catchError((error)=>{
          this.notificationService.showError(error.status);
          return of(bookmarkDeleteError())
        })
      )))
    ));
  }

  private createUpdateEffect() {
    this.updateBookmark = createEffect(() => this.actions.pipe(
      ofType(bookmarkUpdate),
      mergeMap(((action) => this.bookmarkService.update(action.id, action.bookmark).pipe(
        tap(() => this.notificationService.showMessage('bookmarks.updateMessage')),
        map((bookmark => {
          const update: Update<Bookmark> = {
            id: action.id,
            changes: bookmark
          };
          return bookmarkUpdateSuccess({bookmark: update});
        })),
        catchError((error)=>{
          this.notificationService.showError(error.status);
          return of(bookmarkUpdateError())
        })
      )))
    ));
  }
}
