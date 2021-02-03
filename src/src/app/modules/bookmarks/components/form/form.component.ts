import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers";
import {FormFactory, formNames} from "../../../../core/factories/bookmark.factory";
import {BookmarksService} from "../../../../core/services/bookmarks/bookmarks.service";
import {FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {BookmarksErrors, bookmarksErrors} from "../../../../core/errors/bookmarks.error";
import {BookmarkWrapper} from "../../../../core/data/wrappers.data";

@Component({
  selector: 'bookmarks-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  protected readonly store: Store<State>;
  @Output() public viewAvailable: EventEmitter<BookmarkWrapper>;
  protected formFactory: FormFactory;
  protected bookmarkService: BookmarksService;
  public formNames;
  public titleLength: number;
  public form: FormGroup;
  public mainPart: FormGroup;
  public detailsPart: FormGroup;
  public submit: CallableFunction;
  public buttonMessage: string;
  public errors: BookmarksErrors;
  @Output() public formSubmitted: EventEmitter<void>;

  public constructor(
    store: Store<State>,
    formFactory: FormFactory,
    bookmarkService: BookmarksService,
  ) {
    this.store = store;
    this.viewAvailable = new EventEmitter<BookmarkWrapper>();
    this.formFactory = formFactory;
    this.bookmarkService = bookmarkService;
    this.formNames = formNames;
    this.buttonMessage = '';
    this.errors = bookmarksErrors;
    this.formSubmitted = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.mainPart = this.form.get(this.formNames.mainGroup) as FormGroup;
    this.detailsPart = this.form.get(this.formNames.detailsGroup) as FormGroup;
    this.form.statusChanges.pipe(debounceTime(500)).subscribe(() => {
      this.monitorPreview();
    });
    this.mainPart.get(this.formNames.title).valueChanges.subscribe(data => this.titleLength = data.length);
    this.monitorPreview();
  }

  protected monitorPreview(): void {
    if (this.form.valid) {
      this.emitCorrect();
    } else {
      this.viewAvailable.emit({
        isCorrect: false,
        bookmark: null
      });
    }
  }

  protected emitCorrect(): void {
    this.bookmarkService.getIcon({href: this.mainPart.get(this.formNames.href).value}).subscribe(data => {
      this.viewAvailable.emit({
        isCorrect: true,
        bookmark: {
          title: this.mainPart.get(this.formNames.title).value,
          href: this.mainPart.get(this.formNames.href).value,
          backgroundColor: this.detailsPart.get(this.formNames.backgroundColor).value,
          textColor: this.detailsPart.get(this.formNames.textColor).value,
          icon: data.icon,
          id: 0,
          assignedToDashboard: false
        }
      });
    });
  }

  public markAsTouched(): void {
    this.mainPart.markAllAsTouched();
  }
}
