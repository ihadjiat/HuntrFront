import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { contractListComponent } from './contract-list/contract-list.component';
import { contractDetailsComponent } from './contract-detail/contract-detail.component';
import { contractEditComponent } from './contract-edit/contract-edit.component';


@NgModule({
  declarations: [
    contractListComponent,
    contractDetailsComponent,
    contractEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'Contract', component : contractListComponent},
      { path : 'Contract/:id/edit', component : contractEditComponent},
      { path : 'Contract/:id', component : contractDetailsComponent},
    ])
  ]
})
export class contractModule { }
