import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
	private urlManager:string= "http://localhost:3000/api/manager/users";

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json'
			// 'Authorization': 'my-auth-token'
		}),
		observe: 'response'
	};

	private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an observable with a user-facing error message
	  return throwError(
	    'Something bad happened; please try again later.');
	};

	// /**
	//  * Handle Http operation that failed.
	//  * Let the app continue.
	//  * @param operation - name of the operation that failed
	//  * @param result - optional value to return as the observable result
	//  */
	private handleErrorAlt <T> (operation = 'operation', result?: T) {
			return (error: any): Observable<T> => {

				// send the error to remote logging infrastructure
				console.error(error); // log to console instead

				// better job of transforming error for user consumption
				console.error(`${operation} failed: ${error.message}`);

				// Let the app keep running by returning an empty result.
				return of(result as T);
			};
	}

  constructor(private http: HttpClient) {
		// console.log("servico employees");
	}

  login(data:User): Observable<any> {
		const url = `${this.urlManager}/authenticate`;
		return this.http.post(url, data,{
			headers: new HttpHeaders({'Content-Type':  'application/json'
				// 'Authorization': 'my-auth-token'
			}),
			observe: 'response'
		}).pipe(
	      catchError(this.handleError)
	    );
  }

  logout(): void {
    this.isLoggedIn = false;
		localStorage.clear();
  }

	getUsers(): Observable<any>{
		return this.http.get(this.urlManager).pipe(
      catchError(this.handleError)
    );
	}

	getOneUser(id: string): Observable<any>{
		const url = `${this.urlManager}/${id}`;
		return this.http.get(url,{ observe: 'response' }).pipe(
      catchError(this.handleError)
    );
	}

	addUser (data:User): Observable<any> {
	  return this.http.post(this.urlManager, data,{
			headers: new HttpHeaders({'Content-Type':  'application/json'
				// 'Authorization': 'my-auth-token'
			}),
			observe: 'response'
		}).pipe(
	      catchError(this.handleError)
	    );
	}


	deleteUser(id: string): Observable<any> {
	  const url = `${this.urlManager}/${id}`; // DELETE api/element/id
	  return this.http.delete(url, { observe: 'response' })
	    .pipe(
	      catchError(this.handleError)
	    );
	}

	updateUser(id: string,data: any): Observable<any> {
		const url = `${this.urlManager}/${id}`;
	  return this.http.put(url,data,{
			headers: new HttpHeaders({'Content-Type':  'application/json'
				// 'Authorization': 'my-auth-token'
			}),
			observe: 'response'
		}).pipe(
	      catchError(this.handleError)
	    );
	}

}

export interface User{
	_id:string,
	firstName:string,
	lastName:string,
	email:string,
	password:string

};
