import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { contractService } from 'src/app/Contract/contract.Service';
import { Enterprise } from 'src/app/Enterprise/Enterprise';
import { EnterpriseService } from 'src/app/Enterprise/Enterprise.service';
import { Person } from '../Person';
import { PersonService } from '../Person.Service';

@Component({
  selector: 'pm-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailsComponent implements OnInit {

  person : Person = new Person();
  sub!: Subscription;
  sub2!: Subscription;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private PersonService : PersonService,
              private EnterpriseService : EnterpriseService,
              private ContractService : contractService) { }

  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.PersonService.
						getPersonById(id).
						subscribe(
						{
							next: person =>
							{
								this.person = Object.assign(new Person(),person);
                this.person.setPersonExperience();
                this.setPersonEnterprise();

							},
							error: err  =>{console.log( err);}
						});
    this.sub2 = this.ContractService.
                getContractsForPerson(id).
                subscribe(
                  {
                    next: contracts => this.person.contracts = contracts,
                    error: err => console.log(err)
                  }
                )

  }

  setPersonEnterprise() : void
  {
    this.sub = this.EnterpriseService.
    getEnterprisesById(this.person.entrepriseId).
    subscribe(
      {
        next : enterprise =>
        {
          var temp = Object.assign(new Enterprise(), enterprise);
          this.person.entrepriseName = temp.publicName;
        },
        error: err => console.log(err)
      }
    );
  }

  contractDetails(id : number):void
  {
    this.router.navigate(['Contract', id]);
  }

  onBack():void{
    this.router.navigate(['Person']);
  }

}
