import {Injectable} from "@angular/core";
import {BookmarkValidator} from "../validators/bookmarks/bookmark.validator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Bookmark} from "../models/bookmark";

export enum formNames {
  mainGroup = 'main',
  detailsGroup = 'details',
  title = 'title',
  href = 'href',
  backgroundColor = 'backgroundColor',
  textColor = 'textColor',
  assignedToDashboard = 'assignedToDashboard'
}

export interface FormData {
  [formNames.mainGroup]: {
    [formNames.title]: string,
    [formNames.href]: string,
  },
  [formNames.detailsGroup]: {
    [formNames.textColor]: string,
    [formNames.backgroundColor]: string,
  }
}

@Injectable()
export class FormFactory {
  private readonly bookmarkValidator: BookmarkValidator;

  public constructor(bookmarkValidator: BookmarkValidator) {
    this.bookmarkValidator = bookmarkValidator;
  }

  public getCreateForm(): FormGroup {
    return new FormGroup({
      [formNames.mainGroup]: new FormGroup({
        [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        [formNames.href]: new FormControl('', [Validators.required]),
        [formNames.assignedToDashboard]: new FormControl(false, [Validators.required]),
      }, null, [this.bookmarkValidator.validateData.bind(this.bookmarkValidator)]),
      [formNames.detailsGroup]: new FormGroup({
        [formNames.textColor]: new FormControl('#000000', [Validators.required]),
        [formNames.backgroundColor]: new FormControl('#ffffff', [Validators.required])
      }, null, [this.bookmarkValidator.validateDetails.bind(this.bookmarkValidator)])
    });
  }

  public getEditForm(bookmark: Bookmark): FormGroup {
    return new FormGroup({
      [formNames.mainGroup]: new FormGroup({
        [formNames.title]: new FormControl(bookmark.title, [Validators.required, Validators.maxLength(50)]),
        [formNames.href]: new FormControl(bookmark.href, [Validators.required]),
        [formNames.assignedToDashboard]: new FormControl(bookmark.assignedToDashboard, [Validators.required]),
      }, null, [this.bookmarkValidator.validateData.bind(this.bookmarkValidator)]),
      [formNames.detailsGroup]: new FormGroup({
        [formNames.textColor]: new FormControl(bookmark.textColor, [Validators.required]),
        [formNames.backgroundColor]: new FormControl(bookmark.backgroundColor, [Validators.required])
      }, null, [this.bookmarkValidator.validateDetails.bind(this.bookmarkValidator)])
    });
  }
}
