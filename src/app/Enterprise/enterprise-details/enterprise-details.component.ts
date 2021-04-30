import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEnterprise } from '../Enterprise';
import { EnterpriseService } from '../Enterprise.service';

@Component({
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.css']
})
export class EnterpriseDetailsComponent implements OnInit, OnDestroy {

  sub!: Subscription;
  Enterprise: IEnterprise | undefined;


  constructor(private route : ActivatedRoute,
              private EnterpriseService : EnterpriseService,
              private router : Router) { }

  ngOnInit(): void {

    var enterprisesList : IEnterprise[]=[];

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.EnterpriseService.
						getEnterprisesById(id).
						subscribe(
						{
							next: entreprise =>
							{
								this.Enterprise = entreprise;
							},
							error: err  =>{console.log( err);}
						});
  }

  ngOnDestroy() : void
{
  this.sub.unsubscribe();
}

onBack():void{
  this.router.navigate(['Entreprises']);
}

}
