import {Bookmark} from "../models/bookmark";
import {Note} from "../models/note";

export interface BookmarkWrapper {
  isCorrect: boolean;
  bookmark: Bookmark | null;
}

export interface NoteWrapper {
  isCorrect: boolean;
  note: Note | null;
}
