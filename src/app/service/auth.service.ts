import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, flatMap } from 'rxjs/operators';

import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
  signIn(login: string, password: string): Observable<User> {
    const url = `${this.authUrl}/signIn?login=${login}&password=${password}`;
    return this.http.get<User>(url).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.token));
        }

        return user;
      }),
      catchError(this.handleError)
    );
  }

  signUp(user: User): Observable<User> {
    const url = `${this.authUrl}/signUp`;
    const body = { email: user.login, password: user.password };
    const data = JSON.stringify(body);
    return this.http.post<User>(url, data, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.token));
        }

        return user;
      }),
      catchError(this.handleError)
    );
  }
}
