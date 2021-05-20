import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icontract } from '../contract';
import { contractService } from '../contract.Service';

@Component({
  selector: 'pm-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class contractEditComponent implements OnInit
{

  contract : Icontract|undefined;
  contractId:number = 0;
  contractForm !: FormGroup;
  errorMessage : string = "";
  pageTitle : string ="";
  private sub?:Subscription;

  constructor(private fb : FormBuilder,
              private contractService : contractService,
              private route : ActivatedRoute,
              private router : Router )
     { }

  ngOnInit(): void
  {
    this.contractForm = this.fb.group({
      firstName : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      lastName :[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      gender : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      linkedIn : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      phoneNumber : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      emailAdress : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      zipCode : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      city : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      job : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      diploma : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      diplomaObtentionDate : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      currentSalary : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      expectedSalary : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      availability : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      notes : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id') ? params.get('id') : 0;

        this.getcontract(id);

        if ( id === "0" )
        {
          this.pageTitle = `Créer une entreprise`;
        }
      }
    );

  }


  getcontract(id: string | number | null)
  {
    this.sub =this.contractService.getcontractById(id)
      .subscribe({
        next: (contract : Icontract) => this.displaycontract(contract),
        error: err => this.errorMessage = err
      });

  }


  displaycontract(contract: Icontract): void
  {
    if (this.contractForm)
    {
      this.contractForm.reset();
    }

    this.contract = contract;
    if(this.contract.contractId === null )
    {
        this.contract.contractId = 0 ;

    }
    else
    {
      this.contractId = this.contract.contractId;
      this.pageTitle = `Modifier le profile de ${this.contract?.firstName} ${this.contract?.lastName}`;
    }


    // Update the data on the form
    this.contractForm.patchValue({
      firstName : this.contract.firstName,
      lastName :this.contract.lastName,
      gender : this.contract.gender,
      linkedIn : this.contract.linkedIn,
      phoneNumber : this.contract.phoneNumber,
      emailAdress : this.contract.emailAdress,
      zipCode : this.contract.zipCode,
      city : this.contract.city,
      job : this.contract.job,
      diploma : this.contract.diploma,
      diplomaObtentionDate :this.contract.diplomaObtentionDate,
      currentSalary : this.contract.currentSalary,
      expectedSalary : this.contract.expectedSalary,
      availability : this.contract.availability,
      notes : this.contract.notes,
    });
  }


  save()
  {

    if (this.contractForm.valid)
    {
      if (this.contractForm.dirty)
      {
        const p = { ...this.contract, ...this.contractForm.value };

        if (this.contractId === 0)
        {
          this.sub = this.contractService.createcontract(p)
            .subscribe(
              {
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
        }
        else
        {
          this.sub = this.contractService.updatecontract(p)
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


  onSaveComplete()
  {
    // Reset the form to clear the flags
    this.contractForm.reset();
    this.router.navigate(['contract']);
  }


  onBack():void{
    this.router.navigate(['contract']);
  }



}
