import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEnterprise } from '../Enterprise';
import { EnterpriseService } from '../Enterprise.service';

@Component({
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.css']
})


export class EnterpriseListComponent implements OnInit, OnDestroy {

  PageTitle:string='Liste des entreprises'
  sub!: Subscription;
  errorMessage : string ='';

  
  Enterprises:IEnterprise[]=[];

  constructor(private EnterpriseService : EnterpriseService) { }

  ngOnInit(): void 
  {
    this.sub = this.EnterpriseService.
						getEnterprises().
						subscribe(
						{
							next: entreprise => 
							{
								this.Enterprises = entreprise;
							},
							error: err  =>{console.log( err);}
						});
  }

ngOnDestroy() : void
{
  this.sub.unsubscribe();
}

}
