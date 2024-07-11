import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteInputComponent } from './components/note-input/note-input.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import { IconComponent } from './components/icon/icon.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MockDataInterceptor} from "./interceptors/mock-data.interceptor";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NoteInputComponent,
    ActivityFeedComponent,
    IconComponent,
    ConfirmationModalComponent
  ],
  imports: [
    HttpClientModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatMenu,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockDataInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
