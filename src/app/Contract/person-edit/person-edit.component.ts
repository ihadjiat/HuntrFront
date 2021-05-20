import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPerson } from '../contract';
import { PersonService } from '../contract.Service';

@Component({
  selector: 'pm-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit
{

  person : IPerson|undefined;
  personId:number = 0;
  personForm !: FormGroup;
  errorMessage : string = "";
  pageTitle : string ="";
  private sub?:Subscription;

  constructor(private fb : FormBuilder,
              private personService : PersonService,
              private route : ActivatedRoute,
              private router : Router )
     { }

  ngOnInit(): void
  {
    this.personForm = this.fb.group({
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

        this.getPerson(id);

        if ( id === "0" )
        {
          this.pageTitle = `Créer une entreprise`;
        }
      }
    );

  }


  getPerson(id: string | number | null)
  {
    this.sub =this.personService.getPersonById(id)
      .subscribe({
        next: (person : IPerson) => this.displayPerson(person),
        error: err => this.errorMessage = err
      });

  }


  displayPerson(person: IPerson): void
  {
    if (this.personForm)
    {
      this.personForm.reset();
    }

    this.person = person;
    if(this.person.personId === null )
    {
        this.person.personId = 0 ;

    }
    else
    {
      this.personId = this.person.personId;
      this.pageTitle = `Modifier le profile de ${this.person?.firstName} ${this.person?.lastName}`;
    }


    // Update the data on the form
    this.personForm.patchValue({
      firstName : this.person.firstName,
      lastName :this.person.lastName,
      gender : this.person.gender,
      linkedIn : this.person.linkedIn,
      phoneNumber : this.person.phoneNumber,
      emailAdress : this.person.emailAdress,
      zipCode : this.person.zipCode,
      city : this.person.city,
      job : this.person.job,
      diploma : this.person.diploma,
      diplomaObtentionDate :this.person.diplomaObtentionDate,
      currentSalary : this.person.currentSalary,
      expectedSalary : this.person.expectedSalary,
      availability : this.person.availability,
      notes : this.person.notes,
    });
  }


  save()
  {

    if (this.personForm.valid)
    {
      if (this.personForm.dirty)
      {
        const p = { ...this.person, ...this.personForm.value };

        if (this.personId === 0)
        {
          this.sub = this.personService.createPerson(p)
            .subscribe(
              {
                next: () => this.onSaveComplete(),
                error: err => this.errorMessage = err
              });
        }
        else
        {
          this.sub = this.personService.updatePerson(p)
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
    this.personForm.reset();
    this.router.navigate(['Person']);
  }


  onBack():void{
    this.router.navigate(['Person']);
  }



}
