import { Injectable } from '@angular/core';
import { Contact } from '../contact/contact';
import { contactList } from '../data/data';

//Servis za vracanje jednog specificnog kontakta
@Injectable()
export class GetContactService {
  constructor() { }

  contact: Contact;
  contactList: Contact[] = contactList;
  
  getContactById(id) {
    this.contact = this.contactList.find(cont => cont.id === id)!;
    return new Promise<any>((resolve) => {
      resolve(this.contact);
    });
  }

}