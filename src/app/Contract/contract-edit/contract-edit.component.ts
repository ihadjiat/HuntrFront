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
      name : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      creationDate : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      limitDate : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      mission : [ '',[ Validators.required, Validators.minLength( 3 ) ] ],
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id') ? Number( params.get('id') ): 0;

        this.getcontract(id);

        if ( id === 0 )
        {
          this.pageTitle = `Créer un mandat`;
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
      this.pageTitle = `Modifier le mandat ${this.contract?.name} `;
    }


    // Update the data on the form
    this.contractForm.patchValue({
      name: this.contract.name,
      creationDate: this.contract.creationDate,
      limitDate: this.contract.limitDate,
      mission: this.contract.mission,

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
