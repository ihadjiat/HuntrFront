import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Enterprise } from '../Enterprise';
import { EnterpriseService } from '../Enterprise.service';

@Component({
  selector: 'pm-create',
  templateUrl: './enterprise-edit.component.html',
  styleUrls: [ './enterprise-edit.component.css' ]
})
export class EnterpriseEditComponent implements OnInit {

  enterprise : Enterprise|undefined;
  enterpriseId:number = 0;
  enterpriseForm !: FormGroup ;
  errorMessage: string = "";
  private sub?: Subscription;
  pageTitle:string = "";

  constructor(  private fb : FormBuilder,
                private EnterpriseService : EnterpriseService,
                private route: ActivatedRoute,
                private router : Router)
                { }

  ngOnInit(): void {

    this.enterpriseForm = this.fb.group({
      publicName:  [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      siret :[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      adress1:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      adress2:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      zipCode:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      city:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      staffSize:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      creationYear:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      introductionSpeech:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      linkedIn:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      webSite:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      societeDotCom:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
    });

    this.enterpriseForm.get('city')!.valueChanges.subscribe({
      next: value=> console.log(value),
      error: value=>console.log(value)
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id') ? params.get('id') : 0;

        this.getEnterprise(id);

        if ( id === "0" )
        {
          this.pageTitle = `Créer une entreprise`;
        }
      }
    );
  }


  getEnterprise(id: string | number | null)
  {
    this.sub =this.EnterpriseService.getEnterprisesById(id)
      .subscribe({
        next: (enterprise : Enterprise) => this.displayEnterprise(enterprise),
        error: err => this.errorMessage = err
      });
  }

  displayEnterprise(enterprise: Enterprise): void
  {
    if (this.enterpriseForm)
    {
      this.enterpriseForm.reset();
    }

    this.enterprise = enterprise;
    if(this.enterprise.enterpriseId === null )
    {
        this.enterprise.enterpriseId = 0 ;

    }
    else
    {
      this.enterpriseId = this.enterprise.enterpriseId;
      this.pageTitle = `Modifier ${this.enterprise?.publicName}`;
    }


    // Update the data on the form
    this.enterpriseForm.patchValue({
      publicName: this.enterprise.publicName,
      siret: this.enterprise.siret,
      adress1: this.enterprise.adress1,
      adress2:this.enterprise.adress2,
      zipCode:this.enterprise.zipCode,
      city:this.enterprise.city,
      staffSize:this.enterprise.staffSize,
      creationYear:this.enterprise.creationYear,
      introductionSpeech:this.enterprise.introductionSpeech,
      linkedIn:this.enterprise.linkedIn,
      webSite:this.enterprise.webSite,
      societeDotCom:this.enterprise.societeDotCom,
    });

  }

  save()
  {

    if (this.enterpriseForm.valid)
    {
      if (this.enterpriseForm.dirty)
      {
        const p = { ...this.enterprise, ...this.enterpriseForm.value };

        if (this.enterpriseId === 0)
        {
          this.sub = this.EnterpriseService.createEnterprises(p)
            .subscribe(
              {
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
        }
        else
        {
          this.sub = this.EnterpriseService.updateEnterprises(p)
            .subscribe(
              {
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
        }

      } else
      {
        this.onSaveComplete();
      }
    } else
    {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.enterpriseForm.reset();
    this.router.navigate(['Entreprises']);
  }

  OnCancel():void{
    this.router.navigate(['Entreprises']);
  }

}
