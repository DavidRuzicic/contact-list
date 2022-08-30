import { Injectable } from '@angular/core';
import { Contact } from '../contact/contact';
import { contactList } from '../data/data';

//Servis za vracanje liste (data) kontakta
@Injectable()
export class GetContactsService {
  constructor() {}
  contactList: Contact[] = contactList;

  getContacts() {
    return new Promise<any []>((resolve) => {
      const data = this.contactList;
      resolve(data);
    });
  }
}
