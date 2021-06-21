import { Icontract } from "../Contract/contract";
import { Enterprise } from "../Enterprise/Enterprise";


enum Diploma
{
  none,
  Bac,
  Licence,
  Master,
  School,
  Doctorate
}

export class Person
{
  personId : number = 0;
  firstName : string = "";
  lastName : string = "";
  gender : number  = 0;
  linkedIn : string = "";
  phoneNumber : string = "";
  emailAdress : string = "";
  zipCode : string = "";
  city : string = "";
  job : string = "";
  diploma : Diploma = 0;
  diplomaObtentionYear : number = 0;
  currentSalary : string = "";
  expectedSalary : string = "";
  availability : string = "";
  entrepriseId : number = 0;
  entrepriseName:string = " - ";
  experience:string = "";
  notes : string = "";
  contracts : Icontract[]= new Array();


  public setPersonExperience() : void
  {
    var currentYear = new Date().getFullYear();

    if (this.diplomaObtentionYear > 1970 && this.diplomaObtentionYear < currentYear + 1)
    {
        this.experience = (currentYear - this.diplomaObtentionYear).toString();
    }
    else
    {
        this.experience = "-";
    }
  }

  public setEnterpriseName(enterprises : Enterprise[]) : void
  {
    enterprises.forEach(enterprise =>
    {
      if(enterprise.enterpriseId == this.entrepriseId)
      {
        this.entrepriseName = enterprise.publicName;
        return;
      }


    });
  }

}


