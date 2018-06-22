import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BaseService } from './base.service';

@Injectable()
export class AuthService extends BaseService {
  messages = [];
  path = `${environment.path}/auth`;

  TOKEN_KEY = 'token';

  constructor (private http: Http) { super() }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  registerUser(registerData) {
    return this.http.post(`${this.path}/register`, registerData)
      .map((res: Response) => {
        this.saveToken(res.json().token);
        return res.json()
      }).catch(this.handleError);
  }

  loginUser(loginData) {
    return this.http.post(`${this.path}/login`, loginData)
      .map((res: Response) => {
        this.saveToken(res.json().token);
        return res.json()
      }).catch(this.handleError);
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
