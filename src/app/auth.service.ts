import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private authUrl = "http://localhost:3000/api/auth"; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET hero by id. Will 404 if id not found */
  signIn(login: string, password: string): Observable<User> {
    const url = `${this.authUrl}/signIn?login=${login}&password=${password}`;
    return this.http.get<User>(url).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        console.log("user", user);

        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user.token));
        }

        return user;
      })
    );
    // .pipe(
    //   tap(_ => this.log(`fetched hero id=${id}`)),
    //   catchError(this.handleError<User>(`getHero id=${id}`))
    // );
  }

  signUp(user: User): Observable<User> {
    const url = `${this.authUrl}/signUp`;
    const body = { email: user.login, password: user.password };
    const data = JSON.stringify(body);
    return this.http.post<User>(url, data, httpOptions).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        console.log("user", user);

        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user.token));
        }

        return user;
      })
    );
  }
  //   private handleError<T> (operation = 'operation', result?: T) {
  //     return (error: any): Observable<T> => {

  //       // TODO: send the error to remote logging infrastructure
  //       console.error(error); // log to console instead

  //       // TODO: better job of transforming error for user consumption
  //       this.log(`${operation} failed: ${error.message}`);

  //       // Let the app keep running by returning an empty result.
  //       return of(result as T);
  //     };
  //   }

  //   /** Log a HeroService message with the MessageService */
  //   private log(message: string) {
  //     this.messageService.add(`HeroService: ${message}`);
  //   }
  // }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
