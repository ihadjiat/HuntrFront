import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EnterpriseModule } from './Enterprise/enterprise.module';
import { CommonModule } from '@angular/common';
import { EnterpriseListComponent } from './Enterprise/enterprise-list/enterprise-list.component';
import { PersonModule } from './Person/person.module';
import { contractModule } from './Contract/contract.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    EnterpriseModule,
    PersonModule,
    contractModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path : '**', component : EnterpriseListComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


