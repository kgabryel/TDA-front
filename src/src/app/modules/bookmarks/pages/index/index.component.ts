import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Bookmark} from "../../../../core/models/bookmark";
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers";
import {selectBookmarks} from "../../store/selectors";
import {bookmarksLoad} from "../../store/actions";
import {ResizerService, Result, Sizes} from "../../../../core/services/resizer/resizer.service";
import {bookmarksSizes} from "../../../../config/sizes.config";

@Component({
  selector: 'bookmarks-pages-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public bookmarks$: Observable<Bookmark[]>;
  private store: Store<State>;
  public width: string;
  public height: string;
  private readonly sizes: Sizes;
  private resizer: ResizerService;

  constructor(store: Store<State>, resizer: ResizerService) {
    this.store = store;
    this.store.dispatch(bookmarksLoad());
    this.resizer = resizer;
    this.sizes = bookmarksSizes;
  }

  ngOnInit(): void {
    this.bookmarks$ = this.store.select(selectBookmarks);
    const sizes: Result = this.resizer.calculateSizes(this.sizes, window.innerWidth, window.innerHeight);
    this.width = sizes.width;
    this.height = sizes.height;
  }

  @HostListener('window:resize')
  onResize() {
    const sizes: Result = this.resizer.calculateSizes(this.sizes, window.innerWidth, window.innerHeight);
    this.width = sizes.width;
    this.height = sizes.height;
  }
}
