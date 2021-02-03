import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig} from "@angular/material/dialog";
import {Note} from "../../../../core/models/note";

@Component({
  selector: 'notes-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public note: Note;

  constructor(
    @Inject(MAT_DIALOG_DATA) note: Note) {
    this.note = note;
  }

  ngOnInit(): void {
  }

  public static getConfig(note: Note): MatDialogConfig {
    return {
      height: 'calc(100% - 20px)',
      width: 'calc(100% - 20px)',
      data: note
    }
  }
}
