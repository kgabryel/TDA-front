import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Note} from "../../models/note";
import {NoteRequest} from "../../requests/note.request";
import {map} from "rxjs/operators";
import {notesRoutes} from "../../../config/routes.config";

@Injectable()
export class NotesService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAll(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(notesRoutes.index);
  }

  public add(note: NoteRequest): Observable<Note> {
    return this.httpClient.post<Note>(notesRoutes.index, note);
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete<Note>(notesRoutes.byId(id)).pipe(map(() => id));
  }

  public update(id: number, note: NoteRequest): Observable<Note> {
    return this.httpClient.put<Note>(notesRoutes.byId(id), note);
  }
}
