import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bookmarks-bookmark-edit',
  templateUrl: './bookmark-edit.component.html',
  styleUrls: ['./bookmark-edit.component.scss']
})
export class BookmarkEditComponent implements OnInit {
  @Input() showed: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
