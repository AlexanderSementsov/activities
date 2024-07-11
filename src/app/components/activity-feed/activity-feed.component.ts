import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {Note} from "../../models/note.model";
import {TypeMessageEnum} from "../../models/icon-type.type";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.noteService.getNotes().subscribe(notes => {
        this.notes = notes;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteNote(id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.noteService.deleteNote(id);
      }
    });
  }

  getIconForType(type: Note['type']): string {
    switch (type) {
      case 'Message':
        return 'message';
      case 'Phone':
        return 'phone';
      case 'Coffee':
        return 'local_cafe';
      case 'Beer':
        return 'local_bar';
      case 'Meeting Note':
        return 'event_note';
      default:
        return 'note';
    }
  }

    getMessageByType(type: Note['type']): string {
      if (!type) return TypeMessageEnum.Message;
      return TypeMessageEnum[type];
    }
}
