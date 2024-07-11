import {Component, ViewEncapsulation} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {Note} from "../../models/note.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteInputComponent {
  content: string = '';
  selectedType: Note['type'] = 'Message';
  types: Note['type'][] = ['Message', 'Phone', 'Coffee', 'Beer', 'Meeting Note'];
  isExpanded: boolean = false;
  rows: number = 1;
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) {
    this.noteForm = this.fb.group({
      content: ['', Validators.required],
      type: ['Message', Validators.required]
    });
  }

  selectType(type: Note['type']) {
    this.noteForm.get('type')?.setValue(type);
  }

  submitNote() {
    if (this.noteForm.valid) {
      const newNote: Note = {
        id: Date.now(),
        user: 'Current User',
        timestamp: new Date(),
        type: this.noteForm.value.type,
        content: this.noteForm.value.content
      };
      this.noteService.addNote(newNote);
      this.noteForm.get('content')?.markAsUntouched();
      this.noteForm.get('content')?.markAsPristine();
      this.noteForm.reset({ type: 'Message', content: '' });
      this.isExpanded = false;
      this.noteForm.updateValueAndValidity();
    }
  }

  onFocus() {
    this.isExpanded = true;
    this.rows = 3;
  }

  onBlur() {
    if (this.noteForm.get('content')?.value.trim() === '') {
      this.isExpanded = false;
    }
  }
}
