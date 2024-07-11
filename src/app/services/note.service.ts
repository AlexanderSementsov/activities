import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Note} from "../models/note.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  private apiUrl = '/api/notes';

  constructor(private http: HttpClient) {
    this.loadNotes().subscribe();
  }

  getNotes() {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }

  private loadNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      tap(notes => {
        this.notes = notes;
        this.notesSubject.next(this.notes);
      })
    );
  }
}
