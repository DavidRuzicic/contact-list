import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrManager } from "ng6-toastr-notifications";
import { GetContactService } from 'src/app/services/get-contact.service';
import { GetContactsService } from 'src/app/services/get-contacts.service';

import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'contact-list-update',
  templateUrl: './contact-list-update.component.html',
  styleUrls: ['./contact-list-update.component.css']
})
export class ContactListUpdateComponent implements OnInit {
  constructor(
    private toastr: ToastrManager,
    private router: Router,
    private formBuilder: FormBuilder,
    private getContactService: GetContactService,
    private sharedService: SharedService,
    private getContacts: GetContactsService
  ) {
    this.updateContactForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.email]
    });
  }

  updateContactForm: FormGroup;
  customer: any;

  ngOnInit() {
    //Trazimo iz shared servisa sacuvani id kontakta kojeg azuriramo
    const promise = this.getContactService.getContactById(this.sharedService.getViewContactId());
    promise.then(
      response => {
        if (response) {
          //Postavljamo vrijednosti form kontrola
          this.updateContactForm.controls["id"].setValue(response["id"]);
          this.updateContactForm.controls["name"].setValue(response["name"]);
          this.updateContactForm.controls["surname"].setValue(response["surname"]);
          this.updateContactForm.controls["phoneNumber"].setValue(response["phoneNumber"]);
          this.updateContactForm.controls["email"].setValue(response["email"]);
        }
        else{
          this.router.navigate(["/read"]);
        }
      },
      error => {
        console.log("error " + error);
      }
    );
  }

  updateContact() {
    if (this.updateContactForm.valid) {
      const promise = this.getContacts.getContacts();
      promise.then(
        response => {
          const formValues = this.updateContactForm.value;
          //Trazimo index kontakta kojeg azuriramo
          const indexOfUpdatingContact = response.findIndex(x => x.id == this.sharedService.getViewContactId())
          response[indexOfUpdatingContact] = formValues;
          
          this.toastr.successToastr("Contact was successfully updated.", "Success!");
        },
        error => {
          this.toastr.warningToastr("Error. Contact was not updated!", "Alert!");
        }
      );
    } else {
      this.toastr.warningToastr("This is not a valid form.", "Alert!");
    }
  }

  goBack(){
    this.router.navigate(["/read"]);
  }
}