import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icontract } from '../contract';
import { contractService } from '../contract.Service';
import { PersonService } from 'src/app/Person/Person.Service';

@Component({
  selector: 'pm-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class contractDetailsComponent implements OnInit {

  contract : Icontract | undefined;
  sub!: Subscription;
  sub2!: Subscription;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private contractService : contractService,
              private personService : PersonService) { }

  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.contractService.
						getcontractById(id).
						subscribe(
						{
							next: contract =>
							{
								this.contract = contract;
                this.getPeopleList(id);
							},
							error: err  =>{console.log( err);}
						});

  }

  getPeopleList(contractId : number):void
  {
    this.sub2 = this.personService.getPeopleByContractId(contractId).
                    subscribe(
                      {
                        next : people => this.contract?.people,
                        error:err =>{console.log(err)}
                      }
                    )
  }

  personDetails(id : number):void
  {
    this.router.navigate(['Person', id]);
  }

  onBack():void{
    this.router.navigate(['contract']);
  }

}
