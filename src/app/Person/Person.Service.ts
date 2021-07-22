import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { server } from "../Utils";
import { Person } from "./Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  updatepersons(p: any) {
    throw new Error('Method not implemented.');
  }
  createpersons(p: any) {
    throw new Error('Method not implemented.');
  }
  private personUrl = server.concat('Person/');
  private personListUrl = this.personUrl.concat('');
  private personDetailsUrl = this.personUrl.concat('');
  private deletePersonUrl= this.personUrl.concat('');
  private createPersonUrl=this.personUrl.concat('');
  private personListByContractUrl=this.personUrl.concat('GetPeopleByContractId/');



  constructor(private http: HttpClient) { }

  getPerson(): Observable<Person[]>
  {
    return this.http.get<Person[]>(this.personListUrl).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  getPersonById(Id: string | number | null): Observable<Person>
  {
    if(Id === null || Id === 0)
    {
      return of(this.initializeperson());
    }

    return this.http.get<Person>(this.personDetailsUrl.concat(Id.toString())).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }
  getPeopleByContractId(contractId: number):Observable<Person[]>
  {
      return this.http.get<Person[]>(this.personListByContractUrl.concat(contractId.toString())).
                                          pipe(
                                            tap(data=>console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                          );
  }

  initializeperson(): Person {
    return new Person();
  }


  createPerson(person:Person): Observable<Person> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<Person>(this.createPersonUrl, person, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }


  updatePerson(person:Person): Observable<Person>
  {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    var url = this.personDetailsUrl.concat( person.personId.toString() );

    return this.http.put<Person>(url, person, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', data)),
                                            catchError(this.handleError)
                                        );
  }



  Deletepersons(Id:number): Observable<Person>
   {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.delete<Person>( this.deletePersonUrl.concat( Id.toString() ) ) ;
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
