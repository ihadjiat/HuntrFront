import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { server } from "../Utils";
import { Icontract } from "./contract";

@Injectable({
  providedIn: 'root'
})
export class contractService
{
  updatecontracts(p: any)
  {
    throw new Error('Method not implemented.');
  }
  createcontracts(p: any)
  {
    throw new Error('Method not implemented.');
  }

  private contractUrl = server.concat('contract/');
  private contractListUrl = this.contractUrl.concat('');
  private contractDetailsUrl = this.contractUrl.concat('');
  private deletecontractUrl=this.contractUrl.concat('');
  private createcontractUrl=this.contractUrl.concat('');
  private contractListByPersonUrl = this.contractUrl.concat('GetContractsByPersonId/');



  constructor(private http: HttpClient) { }

  getcontract(): Observable<Icontract[]>
  {
    return this.http.get<Icontract[]>(this.contractListUrl).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  getcontractById(Id: string | number | null): Observable<Icontract>
  {
    if(Id === null)
    {
      Id = 0;
    }
    return this.http.get<Icontract>(this.contractDetailsUrl.concat(Id.toString())).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  getContractsForPerson(Id : number) : Observable<Icontract[]>
  {
    return this.http.get<Icontract[]>(this.contractListByPersonUrl.concat(Id.toString())).
                                          pipe(
                                            tap(data =>
                                              console.log('All : ', JSON.stringify(data))),
                                              catchError(this.handleError)
                                          );
  }

  initializecontract(): Icontract {
    return {
            contractId : 0,
            name : "",
            mission : "",
            creationDate : new Date(),
            limitDate : new Date(),
            people : new Array(),
          }
  }


  createcontract(contract:Icontract): Observable<Icontract> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<Icontract>(this.createcontractUrl, contract, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }


  updatecontract(contract:Icontract): Observable<Icontract>
  {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    var url = this.contractDetailsUrl.concat( contract.contractId.toString() );

    return this.http.put<Icontract>(url, contract, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }



  Deletecontracts(Id:number): Observable<Icontract>
   {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.delete<Icontract>( this.deletecontractUrl.concat( Id.toString() ) ) ;
  }




  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
