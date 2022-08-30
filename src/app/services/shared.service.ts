import { Injectable } from '@angular/core';

//Servis napravljen samo za cuvanje id kontakta kojeg azuriramo
@Injectable()
export class SharedService {
  viewContactId: number;
  constructor() {}

  setViewContactId(id) {
    this.viewContactId = id;
  }

  getViewContactId() {
    return this.viewContactId;
  }
}