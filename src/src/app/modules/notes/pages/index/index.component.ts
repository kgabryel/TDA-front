import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Note} from "../../../../core/models/note";
import {notesLoad} from "../../store/actions";
import {selectNotes} from "../../store/selectors";
import {State} from "../../store/reducers";
import {ResizerService, Result, Sizes} from "../../../../core/services/resizer/resizer.service";
import {notesSizes} from "../../../../config/sizes.config";

@Component({
  selector: 'notes-pages-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public notes$: Observable<Note[]>;
  private store: Store<State>;
  public width: string;
  public height: string;
  private resizer: ResizerService;
  private readonly sizes: Sizes;

  constructor(store: Store<State>, resizer: ResizerService) {
    this.sizes = notesSizes;
    this.store = store;
    this.resizer = resizer;
  }

  ngOnInit(): void {
    this.store.dispatch(notesLoad());
    this.notes$ = this.store.select(selectNotes);
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
