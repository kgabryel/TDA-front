import {Component, Inject, OnInit} from '@angular/core';
import {Bookmark} from "../../../../core/models/bookmark";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'bookmarks-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public bookmark: Bookmark;

  constructor(
    @Inject(MAT_DIALOG_DATA) bookmark: Bookmark) {
    this.bookmark = bookmark;
  }

  ngOnInit(): void {
  }

}
