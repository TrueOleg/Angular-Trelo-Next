import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, flatMap } from 'rxjs/operators';

import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUser(token): Observable<User> {
    const url = `${this.usersUrl}/signIn?login=${login}&password=${password}`;
  }
}
