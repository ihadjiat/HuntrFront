import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEnterprise } from '../Enterprise';
import { EnterpriseService } from '../Enterprise.service';

@Component({
  selector: 'pm-create',
  templateUrl: './create.component.html',
  styleUrls: [ './create.component.css' ]
})
export class CreateComponent implements OnInit {

  enterprise : IEnterprise|undefined;
  enterpriseForm !: FormGroup ;
  errorMessage: string = "";

  constructor( private fb : FormBuilder, private EnterpriseService : EnterpriseService ) { }

  ngOnInit(): void {
    this.enterpriseForm = this.fb.group({
      name:[ '',[ Validators.required, Validators.minLength( 3 ) ] ],
      location:[ '',  [Validators.required, Validators.minLength( 3 ) ] ]
    });

    this.enterpriseForm.get('location')!.valueChanges.subscribe({
      next: value=> console.log(value),
      error: value=>console.log(value)
    });
  }


  save() {

    if (this.enterpriseForm.valid)
    {
      if (this.enterpriseForm.dirty)
      {
        const p = { ...this.enterprise, ...this.enterpriseForm.value };

        //if (p.id === 0)
        {
          this.EnterpriseService.createEnterprises(p)
            .subscribe(
              {
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
        }

      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.enterpriseForm.reset();

  }

}
