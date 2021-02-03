import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers";
import {bookmarkDelete} from "../../store/actions";

@Component({
  selector: 'bookmarks-bookmark-delete',
  templateUrl: './bookmark-delete.component.html',
  styleUrls: ['./bookmark-delete.component.scss']
})
export class BookmarkDeleteComponent implements OnInit {
  @Input() showed: boolean;
  @Input() id: number;
  private store: Store<State>;

  constructor(store: Store<State>) {
    this.store = store;
  }

  ngOnInit(): void {
  }

  public delete() {
    this.store.dispatch(bookmarkDelete({id: this.id}));
  }
}
