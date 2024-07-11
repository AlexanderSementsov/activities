import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {ActivityFeedComponent} from "./components/activity-feed/activity-feed.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoteInputComponent} from "./components/note-input/note-input.component";
import {IconComponent} from "./components/icon/icon.component";
import {ConfirmationModalComponent} from "./components/confirmation-modal/confirmation-modal.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatInputModule,
        MatIconModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,

      ],
      declarations: [
        AppComponent,
        ActivityFeedComponent,
        NoteInputComponent,
        IconComponent,
        ConfirmationModalComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
