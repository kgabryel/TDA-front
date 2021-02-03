import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../../../core/models/note";
import {State} from "../../store/reducers";
import {Store} from "@ngrx/store";
import {noteDelete} from "../../store/actions";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {SidenavService} from "../../../../core/services/sidenav/sidenav.service";

@Component({
  selector: 'notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss', '../../shared/note-card.scss']
})
export class NoteComponent implements OnInit {
  @Input() public note: Note;
  private store: Store<State>;
  private dialog: MatDialog;
  private sidenavService: SidenavService<Note>;
  public iconBackGroundColor: string[];

  constructor(store: Store<State>, dialog: MatDialog, sidenavService: SidenavService<Note>) {
    this.store = store;
    this.dialog = dialog;
    this.sidenavService = sidenavService;
  }

  ngOnInit(): void {
  }

  public delete() {
    this.store.dispatch(noteDelete({id: this.note.id}));
  }

  public showFull() {
    this.dialog.open(DialogComponent, DialogComponent.getConfig(this.note));
  }

  public edit() {
    this.sidenavService.changeStatus({
      open: true,
      model: this.note
    });
  }
}
