import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../services/shared.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { GetContactsService } from "src/app/services/get-contacts.service";
import { Router } from "@angular/router";

@Component({
  selector: "contact-list-create",
  templateUrl: "./contact-list-create.component.html",
  styleUrls: ["./contact-list-create.component.css"]
})
export class ContactListCreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    public toastr: ToastrManager,
    private getContacts: GetContactsService
  ) {
    sharedService.setViewContactId(0);
    this.createContactForm = formBuilder.group({
      id: [0],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.email]
    });
  }

  createContactForm: FormGroup;

  ngOnInit() {}

  createCustomer() {
    if (this.createContactForm.valid) {
      const promise = this.getContacts.getContacts();
      promise.then(
        response => {
          const formValues = this.createContactForm.value;
          //Provjeravamo da li postoje vec kontakti u listi, ako da onda trazimo max id i inkrementujemo ga za jedan,
          //ako je duzina 0 onda cemo postaviti id da bude 1
          formValues.id = response.length > 0 ? response.map(contact => contact.id).sort((a, b) => a - b)[response.length - 1] + 1 : 1;
          response.push(formValues);
          this.createContactForm.reset();
          this.toastr.successToastr("Contact was successfully added.", "Success!");
        },
        error => {
          this.toastr.warningToastr("Error. Contact not added!", "Alert!");
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
