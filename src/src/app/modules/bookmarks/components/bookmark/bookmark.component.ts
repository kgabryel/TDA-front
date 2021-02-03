import {Component, Input, OnInit} from '@angular/core';
import {Bookmark} from "../../../../core/models/bookmark";

@Component({
  selector: 'bookmarks-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  @Input() bookmark: Bookmark;

  constructor() {
  }

  ngOnInit(): void {
  }

}
