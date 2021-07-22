import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailsComponent } from './person-detail/person-detail.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonTableLineComponent } from './person-table-line/person-table-line.component';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailsComponent,
    PersonEditComponent,
    PersonTableLineComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'Person', component : PersonListComponent},
      { path : 'Person/:id/edit', component : PersonEditComponent},
      { path : 'Person/:id', component : PersonDetailsComponent},
    ])
  ],
  exports:[
    PersonTableLineComponent
  ]
})
export class PersonModule { }
