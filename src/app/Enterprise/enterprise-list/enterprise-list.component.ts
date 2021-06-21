import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Enterprise } from '../Enterprise';
import { EnterpriseService } from '../Enterprise.service';

@Component({
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.css']
})


export class EnterpriseListComponent implements OnInit, OnDestroy {

  PageTitle:string='Liste des entreprises'
  sub!: Subscription;
  errorMessage : string ='';


  Enterprises:Enterprise[]=[];

  constructor(private EnterpriseService : EnterpriseService,
              private router : Router)
              { }

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

OnNew():void
{
  this.router.navigate(['Entreprises/0/edit']);
}

OnEdit(id:number):void{
  this.router.navigate(['Entreprises/1/edit']);
}

OnDelete(id:number):void{
  if( confirm("Voulez vous vraiment supprimer cet élément ?") )
  {
    this.sub = this.EnterpriseService.
                DeleteEnterprises(id).
                        subscribe({
                          next: e=>{this.ngOnInit()},
                          error: err  =>{console.log( err);}
                        });
  }



}

}
