import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { Contact } from "src/app/contact/contact";
import { GetContactsService } from "src/app/services/get-contacts.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "contact-list-read",
  templateUrl: "./contact-list-read.component.html",
  styleUrls: ["./contact-list-read.component.css"]
})
export class ContactListReadComponent implements OnInit {
  contactList: Contact[] = [];
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private getContacts: GetContactsService,
    public toastr: ToastrManager
  ) {
    sharedService.setViewContactId(null);
  }

  ngOnInit() {
    const promise = this.getContacts.getContacts();
    promise.then(
      response => {
        this.contactList = response;
      },
      error => {
        console.log("error " + error);
      }
    );
  }
  
  createContact() {
    this.router.navigate(["/create"]);
  }

  updateContact(id) {
    //Pozivamo servis da sacuva id
    this.sharedService.setViewContactId(id);
    this.router.navigate(["/update"]);
  }

  deleteContact(id) {
    //Brisemo trazeni kontakt iz liste
    const index = this.contactList.findIndex(x => x.id == id);
    if (index > -1) {
      this.contactList.splice(index, 1);
    }
    this.toastr.successToastr("Contact was successfully deleted.", "Success!");
  }
}
