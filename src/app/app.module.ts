import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListReadComponent } from './contact-list/contact-list-read/contact-list-read.component';
import { GetContactService } from './services/get-contact.service';
import { GetContactsService } from './services/get-contacts.service';
import { SharedService } from './services/shared.service';
import { ToastrModule } from "ng6-toastr-notifications";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListCreateComponent } from './contact-list/contact-list-create/contact-list-create.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactListUpdateComponent } from './contact-list/contact-list-update/contact-list-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListReadComponent,
    ContactListCreateComponent,
    ContactListUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [GetContactService, GetContactsService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
