import {Component, OnInit} from '@angular/core';
import {SidenavService} from "../../../../core/services/sidenav/sidenav.service";
import {Bookmark} from "../../../../core/models/bookmark";

@Component({
  selector: 'bookmarks-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss']
})
export class NewBookmarkComponent implements OnInit {

  private sidenavService: SidenavService<Bookmark>;

  constructor(sidenavService: SidenavService<Bookmark>) {
    this.sidenavService = sidenavService;
  }

  ngOnInit(): void {
    this.sidenavService.changeStatus({
      open: false,
      model: null
    });
  }

  public showSidenav() {
    this.sidenavService.changeStatus({
      open: true,
      model: null
    });
  }
}
