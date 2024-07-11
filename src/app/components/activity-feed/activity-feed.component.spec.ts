import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ActivityFeedComponent } from './activity-feed.component';
import { NoteService } from '../../services/note.service';
import {MatIconModule} from "@angular/material/icon";
import {NoteInputComponent} from "../note-input/note-input.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Note} from "../../models/note.model";
import {of} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import {IconComponent} from "../icon/icon.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('ActivityFeedComponent', () => {
  let component: ActivityFeedComponent;
  let fixture: ComponentFixture<ActivityFeedComponent>;
  let noteService: NoteService;
  let dialog: MatDialog;

  const mockNotes: Note[] = [
    { id: 1, user: 'User 1', timestamp: new Date(), type: 'Message', content: 'Note 1' },
    { id: 2, user: 'User 2', timestamp: new Date(), type: 'Phone', content: 'Note 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule,
        NoopAnimationsModule,
      ],
      declarations: [ActivityFeedComponent, NoteInputComponent, IconComponent],
      providers: [NoteService]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityFeedComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);
    dialog = TestBed.inject(MatDialog);

    spyOn(noteService, 'getNotes').and.returnValue(of(mockNotes));
    spyOn(noteService, 'deleteNote').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display notes', () => {
    fixture.detectChanges();
    const noteElements = fixture.debugElement.queryAll(By.css('.note'));
    expect(noteElements.length).toBe(3);

    const firstNoteContent = noteElements[1].query(By.css('.note-body span')).nativeElement.textContent;
    expect(firstNoteContent).toContain('Note 1');
  });

  it('should open confirmation dialog and delete note on confirmation', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.deleteNote(mockNotes[0].id);

    fixture.detectChanges();
    expect(dialog.open).toHaveBeenCalled();
    expect(noteService.deleteNote).toHaveBeenCalledWith(mockNotes[0].id);
  });

  it('should open confirmation dialog and not delete note on cancellation', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(false)
    } as any);

    component.deleteNote(mockNotes[0].id);

    fixture.detectChanges();
    expect(dialog.open).toHaveBeenCalled();
    expect(noteService.deleteNote).not.toHaveBeenCalled();
  });
});
