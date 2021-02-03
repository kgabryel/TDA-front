import {HttpClient} from "@angular/common/http";
import {AbstractControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {formNames} from "../../factories/bookmark.factory";
import {bookmarksRoutes} from "../../../config/routes.config";

const required = 'required';
const invalidFormat = 'invalidFormat';
const tooLong = 'tooLong';

@Injectable()
export class BookmarkValidator {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  validateData(form: AbstractControl): Observable<object> {
    return this.httpClient.post<any>(bookmarksRoutes.validateMain, form.value).pipe(
      delay(1000),
      map<any, object>(() => null),
      catchError(error => {
          if (error.error.errors.title !== undefined) {
            const titleErrors = error.error.errors.title;
            if (titleErrors.includes(required)) {
              form.get(formNames.title).setErrors({required: true});
            }
            if (titleErrors.includes(invalidFormat)) {
              form.get(formNames.title).setErrors({invalidFormat: true});
            }
            if (titleErrors.includes(tooLong)) {
              form.get(formNames.title).setErrors({maxlength: true});
            }
          }
          if (error.error.errors.href !== undefined) {
            const hrefErrors = error.error.errors.href;
            if (hrefErrors.includes(required)) {
              form.get(formNames.href).setErrors({required: true});
            }
            if (hrefErrors.includes(invalidFormat)) {
              form.get(formNames.href).setErrors({invalidFormat: true});
            }
          }
          return of(null);
        }
      )
    );
  }

  validateDetails(form: AbstractControl): Observable<object> {
    return this.httpClient.post<any>(bookmarksRoutes.validateDetails, form.value).pipe(
      delay(1000),
      map<any, object>(() => null),
      catchError(error => {
          if (error.error.errors.backgroundColor !== undefined) {
            const backgroundColorErrors = error.error.errors.backgroundColor;
            if (backgroundColorErrors.includes(required)) {
              form.get(formNames.backgroundColor).setErrors({required: true});
            }
            if (backgroundColorErrors.includes(invalidFormat)) {
              form.get(formNames.backgroundColor).setErrors({invalidFormat: true});
            }
          }

          if (error.error.errors.textColor !== undefined) {
            const textColorErrors = error.error.errors.textColor;
            if (textColorErrors.includes(required)) {
              form.get(formNames.textColor).setErrors({required: true});
            }
            if (textColorErrors.includes(invalidFormat)) {
              form.get(formNames.textColor).setErrors({invalidFormat: true});
            }
          }
          return of(null);
        }
      )
    );
  }
}
