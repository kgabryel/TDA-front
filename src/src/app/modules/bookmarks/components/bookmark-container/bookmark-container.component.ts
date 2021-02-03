import {Component, Input, OnInit} from '@angular/core';
import {Bookmark} from "../../../../core/models/bookmark";
import {SidenavService} from "../../../../core/services/sidenav/sidenav.service";

@Component({
  selector: 'bookmarks-bookmark-container',
  templateUrl: './bookmark-container.component.html',
  styleUrls: ['./bookmark-container.component.scss']
})
export class BookmarkContainerComponent implements OnInit {
  public active: boolean;
  @Input() bookmark: Bookmark;
  private sidenavService: SidenavService<Bookmark>;

  constructor(sidenavService: SidenavService<Bookmark>) {
    this.sidenavService = sidenavService;
  }

  ngOnInit(): void {
    this.active = false;
  }

  public showOptions() {
    this.active = true;
  }

  public hideOptions() {
    this.active = false;
  }

  public edit() {
    this.sidenavService.changeStatus({
      open: true,
      model: this.bookmark
    });
  }
}
