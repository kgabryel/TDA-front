import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bookmark} from "../../models/bookmark";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {State} from "../../../modules/bookmarks/store/reducers";
import {bookmarkAdd, bookmarkUpdate} from "../../../modules/bookmarks/store/actions";
import {FormData, formNames} from "../../factories/bookmark.factory";
import {bookmarksRoutes} from "../../../config/routes.config";
import {BookmarkRequest, IconRequest, IconResult} from "../../requests/bookmark.request";

@Injectable()
export class BookmarksService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): Observable<Bookmark[]> {
    return this.httpClient.get<Bookmark[]>(bookmarksRoutes.index);
  }

  public getIcon(href: IconRequest): Observable<IconResult> {
    return this.httpClient.post<IconResult>(bookmarksRoutes.getIcon, href);
  }

  public add(bookmark: BookmarkRequest): Observable<Bookmark> {
    return this.httpClient.post<Bookmark>(bookmarksRoutes.index, bookmark);
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete<any>(bookmarksRoutes.byId(id)).pipe(
      map(() => id)
    );
  }

  public createBookmark(form: FormData, store: Store<State>): void {
    this.getIcon({href: form[formNames.mainGroup][formNames.href]}).subscribe(icon => {
      const bookmark: BookmarkRequest = BookmarksService.createBookmark(icon, form);
      store.dispatch(bookmarkAdd({bookmark}));
    });
  }

  public update(id: number, bookmark: BookmarkRequest): Observable<Bookmark> {
    return this.httpClient.put<Bookmark>(bookmarksRoutes.byId(id), bookmark);
  }

  public updateBookmark(id: number, form: FormData, store: Store<State>): void {
    this.getIcon({href: form[formNames.mainGroup][formNames.href]}).subscribe(icon => {
      const bookmark: BookmarkRequest = BookmarksService.createBookmark(icon, form);
      store.dispatch(bookmarkUpdate({id, bookmark}));
    });
  }

  private static createBookmark(iconResult: IconResult, formData: FormData): BookmarkRequest {
    return {
      title: formData[formNames.mainGroup][formNames.title],
      href: formData[formNames.mainGroup][formNames.href],
      backgroundColor: formData[formNames.detailsGroup][formNames.backgroundColor],
      textColor: formData[formNames.detailsGroup][formNames.textColor],
      icon: iconResult.icon,
      assignedToDashboard: formData[formNames.mainGroup][formNames.assignedToDashboard]
    }
  }
}
