import { Enterprise } from "../Enterprise/Enterprise";
import { Person } from "../Person/Person";


export interface Icontract
{
  contractId      : number;
  name            : string;
  mission         : string;
  creationDate    : Date;
  limitDate       : Date;
  people          : Person[];

}


