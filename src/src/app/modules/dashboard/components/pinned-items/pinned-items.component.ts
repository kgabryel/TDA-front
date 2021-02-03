import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Note} from "../../../../core/models/note";
import {Store} from "@ngrx/store";
import {State as NotesState} from "../../../notes/store/reducers";
import {State as BookmarksState} from "../../../bookmarks/store/reducers";

import {notesLoad} from "../../../notes/store/actions";
import {selectAssignedToDashboard as selectNotesAssignedToDashboard} from "../../../notes/store/selectors";
import {Bookmark} from "../../../../core/models/bookmark";
import {bookmarksLoad} from "../../../bookmarks/store/actions";
import {selectAssignedToDashboard as selectBookmarksAssignedToDashboard} from "../../../bookmarks/store/selectors";
import {Task} from "../../../../core/models/task";
import {State as TasksState} from "../../../../store/reducers";
import {taskLoad} from "../../../../store/actions";
import {selectTasksForToday} from "../../../../store/selectors/task";

@Component({
  selector: 'dashboard-pinned-items',
  templateUrl: './pinned-items.component.html',
  styleUrls: ['./pinned-items.component.scss']
})
export class PinnedItemsComponent implements OnInit {

  @Input() public small$: Observable<boolean>;
  public notes$: Observable<Note[]>;
  public bookmarks$: Observable<Bookmark[]>;
  public tasks$: Observable<Task[]>;
  private noteStore: Store<NotesState>;
  private bookmarkStore: Store<BookmarksState>;
  private taskStore: Store<TasksState>;

  constructor(noteStore: Store<NotesState>, bookmarkStore: Store<BookmarksState>, taskStore: Store<TasksState>) {
    this.noteStore = noteStore;
    this.bookmarkStore = bookmarkStore;
    this.taskStore = taskStore;
  }

  ngOnInit(): void {
    this.noteStore.dispatch(notesLoad());
    this.notes$ = this.noteStore.select(selectNotesAssignedToDashboard);
    this.bookmarkStore.dispatch(bookmarksLoad());
    this.bookmarks$ = this.bookmarkStore.select(selectBookmarksAssignedToDashboard);
    this.taskStore.dispatch(taskLoad());
    this.tasks$ = this.taskStore.select(selectTasksForToday);
  }

}
