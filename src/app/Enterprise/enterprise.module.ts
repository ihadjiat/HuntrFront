import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnterpriseListComponent } from './enterprise-list/enterprise-list.component';
import { EnterpriseDetailsComponent } from './enterprise-details/enterprise-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    EnterpriseListComponent,
    EnterpriseDetailsComponent,
    CreateComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,

    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'Entreprises', component : EnterpriseListComponent},
      { path : 'Entreprises/new', component : CreateComponent},
      { path : 'Entreprises/:id', component : EnterpriseDetailsComponent},

    ])
  ]
})
export class EnterpriseModule { }
