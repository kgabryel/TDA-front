import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {NotificationService} from "../../../core/services/notification/notification.service";
import {NotesService} from "../../../core/services/notes/notes.service";
import {
  noteAdd, noteAddError,
  noteAddSuccess,
  noteDelete, noteDeleteError,
  noteDeleteSuccess,
  notesLoad,
  notesLoadError,
  notesLoadSuccess,
  noteUpdate, noteUpdateError,
  noteUpdateSuccess
} from "./actions";
import {Note} from "../../../core/models/note";
import {Update} from "@ngrx/entity";
import {PathUtils} from "../../../core/utils/path.utils";
import {RoutingConfig} from "../../../config/routing.config";
import {Router} from "@angular/router";
import {of} from "rxjs";


@Injectable()
export class NotesEffects {

  private actions: Actions;
  private noteService: NotesService;
  private notificationService: NotificationService;
  private router: Router;
  loadNotes;
  addNotes;
  deleteNotes;
  updateNotes;

  constructor(
    actions: Actions,
    noteService: NotesService,
    notificationService: NotificationService,
    router: Router
  ) {
    this.actions = actions;
    this.noteService = noteService;
    this.notificationService = notificationService;
    this.router = router;
    this.createLoadEffect();
    this.createAddEffect();
    this.createDeleteEffect();
    this.createUpdateEffect();
  }

  private createLoadEffect() {
    this.loadNotes = createEffect(() => this.actions.pipe(
      ofType(notesLoad),
      mergeMap((() => this.noteService.getAll().pipe(
        map((notes => notesLoadSuccess({notes})))
      ))),
      catchError((error) => {
        this.notificationService.showError(error.status);
        return of(notesLoadError())
      })
    ));
  }

  private createAddEffect() {
    this.addNotes = createEffect(() =>
      this.actions.pipe(
        ofType(noteAdd),
        mergeMap(action => this.noteService.add(action.note).pipe(
          map((note => {
            this.router.navigateByUrl(PathUtils.concatPath(RoutingConfig.notes));
            this.notificationService.showMessage('notes.addMessage')
            return noteAddSuccess({note})
          })),
          catchError((error) => {
            this.notificationService.showError(error.status);
            return of(noteAddError())
          })
        ))
      ));
  }

  private createDeleteEffect() {
    this.deleteNotes = createEffect(() => this.actions.pipe(
      ofType(noteDelete),
      mergeMap(((action) => this.noteService.delete(action.id).pipe(
        tap(() => this.notificationService.showMessage('notes.deleteMessage')),
        map((id => {
          return noteDeleteSuccess({id})
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(noteDeleteError())
        })
      )))
    ));
  }

  private createUpdateEffect() {
    this.updateNotes = createEffect(() => this.actions.pipe(
      ofType(noteUpdate),
      mergeMap(((action) => this.noteService.update(action.id, action.note).pipe(
        tap(() => this.notificationService.showMessage('notes.updateMessage')),
        map((note => {
          const update: Update<Note> = {
            id: action.id,
            changes: note
          };
          return noteUpdateSuccess({note: update});
        })),
        catchError((error) => {
          this.notificationService.showError(error.status);
          return of(noteUpdateError())
        })
      )))
    ));
  }
}
