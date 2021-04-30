import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { IEnterprise } from "./Enterprise";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private EnterpriseListUrl = 'https://localhost:44343/api/Enterprise';
  private EnterpriseDetailsUrl = 'https://localhost:44343/api/Enterprise/';
  private createEnterpriseUrl = 'https://localhost:44343/api/Enterprise/';

  constructor(private http: HttpClient) { }

  getEnterprises(): Observable<IEnterprise[]> {
    return this.http.get<IEnterprise[]>(this.EnterpriseListUrl).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  getEnterprisesById(Id:number): Observable<IEnterprise> {
        return this.http.get<IEnterprise>(this.EnterpriseDetailsUrl.concat(Id.toString())).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
  }

  createEnterprises(enterprise:IEnterprise): Observable<IEnterprise> {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post<IEnterprise>(this.createEnterpriseUrl, enterprise, {headers : headers}).
                                        pipe(
                                            tap(data =>
                                                console.log('All: ', JSON.stringify(data))),
                                            catchError(this.handleError)
                                        );
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