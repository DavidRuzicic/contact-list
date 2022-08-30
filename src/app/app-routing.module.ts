import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListCreateComponent } from './contact-list/contact-list-create/contact-list-create.component';
import { ContactListReadComponent } from './contact-list/contact-list-read/contact-list-read.component';
import { ContactListUpdateComponent } from './contact-list/contact-list-update/contact-list-update.component';

const routes: Routes = [
  {
    path: "",
    component: ContactListReadComponent
  },
  {
    path: "read",
    component: ContactListReadComponent
  },
  {
    path: "create",
    component: ContactListCreateComponent
  },
  {
    path: "update",
    component: ContactListUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
