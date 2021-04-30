import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPerson } from '../Person';
import { PersonService } from '../Person.Service';

@Component({
  selector: 'pm-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  PageTitle:string = "Hello World!"
  People: IPerson[] = [];
  sub!: Subscription;

  constructor(private PersonService : PersonService) { }

  ngOnInit(): void {
    this.sub = this.PersonService.
						getEnterprises().
						subscribe(
						{
							next: people => 
							{
								this.People = people;
							},
							error: err  =>{console.log( err);}
						});
  }

}
