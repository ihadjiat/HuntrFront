import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Enterprise } from 'src/app/Enterprise/Enterprise';
import { EnterpriseService } from 'src/app/Enterprise/Enterprise.service';
import { Person } from '../Person';
import { PersonService } from '../Person.Service';

@Component({
  selector: 'pm-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  PageTitle:string = "Liste des personnes"
  People: Person[] = [];
  sub!: Subscription;

  constructor(private PersonService : PersonService,
              private enterpriseService : EnterpriseService,
              private router : Router  )
                 { }

  ngOnInit(): void {
  this.sub = this.PersonService.
						getPerson().
						subscribe(
						{
							next: people =>
							{
								this.People = people.map(x => Object.assign(new Person(), x));
                this.setPeopleExperience();
							},
							error: err  =>{console.log( err);}
						});

    this.sub = this.enterpriseService.
                getEnterprises().
                subscribe(
                  {
                    next: enterprises =>
                    {
                        var temp = enterprises.map(x => Object.assign(new Enterprise(), x));
                        this.setPeopleEnterprise(temp);
                    },
                    error:err => {console.log(err);}
                  }
                )
  }

  setPeopleExperience() : void
  {
      this.People.forEach( person =>
      {
        person.setPersonExperience();
      })
  }

  setPeopleEnterprise(enterprises : Enterprise[]) : void
  {
      this.People.forEach( person =>
      {
        person.setEnterpriseName(enterprises);
      })
  }


  personDetails(id : number):void
  {
    this.router.navigate(['Person', id]);
  }

  OnDelete(id:number):void
  {

  }

}
