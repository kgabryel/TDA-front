import {Component, OnInit} from '@angular/core';
import {SidenavService, Wrapper} from "../../../../core/services/sidenav/sidenav.service";
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Note} from "../../../../core/models/note";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {NoteWrapper} from "../../../../core/data/wrappers.data";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'notes-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private sidenavService: SidenavService<Note>;
  public showed$: Observable<Wrapper<Note>>;
  private breakpointObserver: BreakpointObserver;
  public small$: Observable<boolean>;
  private dialog: MatDialog;
  private note: Note | null;
  public dialogAvailable: boolean;

  constructor(
    sidenavService: SidenavService<Note>,
    breakpointObserver: BreakpointObserver,
    dialog: MatDialog,
  ) {
    this.sidenavService = sidenavService;
    this.breakpointObserver = breakpointObserver;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.dialogAvailable = false;
    this.showed$ = this.sidenavService.getState();
    this.breakpointObserver
      .observe(doubleToolbarBreakPoint)
      .subscribe(size => this.small$ = of(size.matches));
  }

  public changeStatus($event) {
    this.dialogAvailable = false;
    this.sidenavService.changeStatus({
      open: $event,
      model: null
    })
  }

  public openDialog(): void {
    this.dialog.open(DialogComponent, DialogComponent.getConfig(this.note));
  }

  public viewAvailable($event: NoteWrapper): void {
    this.dialogAvailable = $event.isCorrect;
    this.note = $event.note;
  }


}
