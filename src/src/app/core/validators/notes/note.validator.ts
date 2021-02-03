import {HttpClient} from "@angular/common/http";
import {AbstractControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {formNames} from "../../factories/note.factory";
import {notesRoutes} from "../../../config/routes.config";

const required = 'required';
const invalidFormat = 'invalidFormat';
const tooLong = 'tooLong';

@Injectable()
export class NoteValidator {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  validate(form: AbstractControl): Observable<object> {
    return this.httpClient.post<any>(notesRoutes.validate, form.value).pipe(
      delay(1000),
      map<any, object>(() => null),
      catchError(error => {
          if (error.error.errors.title !== undefined) {
            const titleErrors = error.error.errors.title;
            if (titleErrors.includes(invalidFormat)) {
              form.get(formNames.title).setErrors({invalidFormat: true});
            }
            if (titleErrors.includes(tooLong)) {
              form.get(formNames.title).setErrors({maxlength: true});
            }
          }

        if (error.error.errors.content !== undefined) {
          const contentErrors = error.error.errors.content;
          if (contentErrors.includes(required)) {
            form.get(formNames.content).setErrors({required: true});
          }
          if (contentErrors.includes(invalidFormat)) {
            form.get(formNames.content).setErrors({invalidFormat: true});
          }
        }
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
