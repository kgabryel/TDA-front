import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Wrapper, SidenavService} from "../../../../core/services/sidenav/sidenav.service";
import {Bookmark} from "../../../../core/models/bookmark";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {BookmarkWrapper} from "../../../../core/data/wrappers.data";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'bookmarks-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public showed$: Observable<Wrapper<Bookmark>>;
  private sidenavService: SidenavService<Bookmark>;
  public dialogAvailable: boolean;
  private bookmark: Bookmark | null;
  private dialog: MatDialog;
  private breakpointObserver: BreakpointObserver;
  public small$: Observable<boolean>;

  constructor(sidenavService: SidenavService<Bookmark>, dialog: MatDialog, breakpointObserver: BreakpointObserver) {
    this.sidenavService = sidenavService;
    this.dialog = dialog;
    this.breakpointObserver = breakpointObserver;
  }

  ngOnInit(): void {
    this.dialogAvailable = false;
    this.showed$ = this.sidenavService.getState();
    this.breakpointObserver
      .observe(doubleToolbarBreakPoint)
      .subscribe(size => this.small$ = of(size.matches));
  }

  changeStatus($event) {
    this.dialogAvailable = false;
    this.sidenavService.changeStatus({
      open: $event,
      model: null
    })
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {data: this.bookmark});
  }

  viewAvailable($event: BookmarkWrapper): void {
    this.dialogAvailable = $event.isCorrect;
    this.bookmark = $event.bookmark;
  }
}
