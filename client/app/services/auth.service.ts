import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BaseService } from './base.service';
import { AuthResponse } from '../interfaces/authResponse';

@Injectable()
export class AuthService extends BaseService {
  messages = [];
  path = `${environment.path}/auth`;

  TOKEN_KEY = 'token';

  constructor (private http: HttpClient) { super() }

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
    return this.http.post<AuthResponse>(`${this.path}/register`, registerData)
      .map((res) => {
        this.saveToken(res.token);
        return res;
      }).catch(this.handleError);
  }

  loginUser(loginData) {
    return this.http.post<AuthResponse>(`${this.path}/login`, loginData)
      .map((res) => {
        this.saveToken(res.token);
        sessionStorage.setItem('id', res.user._id);
        return res;
      }).catch(this.handleError);
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
