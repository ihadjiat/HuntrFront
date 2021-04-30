import { IEnterprise } from "../Enterprise/Enterprise";

export interface IPerson{

    PersonId:number;
    FirstName:string;
    LastName:string;
    Enterprise:IEnterprise;

}
