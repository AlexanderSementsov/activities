import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoteInputComponent } from './note-input.component';
import { NoteService } from '../../services/note.service';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {IconComponent} from "../icon/icon.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Note} from "../../models/note.model";

describe('NoteInputComponent', () => {
  let component: NoteInputComponent;
  let fixture: ComponentFixture<NoteInputComponent>;
  let noteService: NoteService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      declarations: [NoteInputComponent, IconComponent],
      providers: [NoteService]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteInputComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);

    spyOn(noteService, 'addNote').and.callThrough();
    fixture.detectChanges();
  });


  it('should submit a note', () => {
    const noteContent = 'Test Note';
    const noteType = 'Message';

    component.noteForm.get('content')?.setValue(noteContent);
    component.noteForm.get('type')?.setValue(noteType);

    component.submitNote();

    expect(noteService.addNote).toHaveBeenCalledWith(jasmine.objectContaining({
      content: noteContent,
      type: noteType,
      user: 'Current User',
    } as Partial<Note>));

    expect(component.noteForm.get('content')?.value).toBe('');
    expect(component.noteForm.get('type')?.value).toBe('Message');
    expect(component.isExpanded).toBe(false);
  });

  it('should not submit an empty note', () => {
    component.submitNote();

    expect(noteService.addNote).not.toHaveBeenCalled();
  });

  it('should expand textarea on focus', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.triggerEventHandler('focus', {});
    fixture.detectChanges();

    expect(component.isExpanded).toBe(true);
  });
});
