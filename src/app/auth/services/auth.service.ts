import { Injectable } from '@angular/core';
import {RegisterRequestInterface} from '../types/register-request.interface';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/type/current-user.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthResponseInterface} from '../types/auth-response.interface';
import {map} from 'rxjs/operators';
import {LoginRequestInterface} from '../types/login-request.interface';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) { }

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';

    return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';

    return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get(url).pipe(map(this.getUser));
  }

}

