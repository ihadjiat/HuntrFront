import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Observable, of, scheduled, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Enterprise } from "./Enterprise";


@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private EnterpriseListUrl = 'https://localhost:44343/api/Enterprise';
  private EnterpriseDetailsUrl = 'https://localhost:44343/api/Enterprise/';
  private createEnterpriseUrl = 'https://localhost:44343/api/Enterprise/';
  private DeleteEnterpriseUrl = 'https://localhost:44343/api/Enterprise/';


  constructor(private http: HttpClient) { }

  getEnterprises(): Observable<Enterprise[]> {
    return this.http.get<Enterprise[]>(this.EnterpriseListUrl).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  getEnterprisesById(Id: string | number | null): Observable<Enterprise>
  {
    if (Id === 0 || Id === null)
    {
      return of(this.initializeEnterprise());
    }

    return this.http.get<Enterprise>(this.EnterpriseDetailsUrl.concat(Id.toString())).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }



  initializeEnterprise(): Enterprise {
    return new Enterprise();
  }

  createEnterprises(enterprise:Enterprise): Observable<Enterprise> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<Enterprise>(this.createEnterpriseUrl, enterprise, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }


  updateEnterprises(enterprise:Enterprise): Observable<Enterprise>
  {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    var url = this.EnterpriseDetailsUrl.concat( enterprise.enterpriseId.toString() );

    return this.http.put<Enterprise>(url, enterprise, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }



  DeleteEnterprises(Id:number): Observable<Enterprise> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.delete<Enterprise>( this.DeleteEnterpriseUrl.concat( Id.toString() ) ) ;
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
