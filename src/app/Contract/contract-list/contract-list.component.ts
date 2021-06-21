import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icontract } from '../contract';
import { contractService } from '../contract.Service';

@Component({
  selector: 'pm-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})

export class contractListComponent implements OnInit {

  PageTitle:string = "Liste des mandats"
  People: Icontract[] = [];
  sub!: Subscription;

  constructor(private contractService : contractService,
              private router : Router  )
                 { }

  ngOnInit(): void {
    this.sub = this.contractService.
						getcontract().
						subscribe(
						{
							next: people =>
							{
								this.People = people;
							},
							error: err  =>{console.log( err);}
						});
  }

  contractDetails(id : number):void
  {
    this.router.navigate(['Contract', id]);
  }

  OnDelete(id:number):void
  {

  }

}
