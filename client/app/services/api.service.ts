import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class ApiService extends BaseService {
  users = [];
  path = `${environment.path}/api`;

  constructor (private http: HttpClient) { super(); }

  getMessages(userId) {
    return this.http.get<any>(`${this.path}/posts/${userId}`)
      .map((res) => {
        return res;
      }).catch(this.handleError);
  }

  postMessage(message) {
    return this.http.post(`${this.path}/post`, message)
      .map((res: Response) => {
        return res;
      }).catch(this.handleError);
  }

  getUsers() {
    this.http.get<any>(`${this.path}/users`).subscribe(res => {
      this.users = res;
    });
  }

  getProfile(id) {
    return this.http.get<any>(`${this.path}/users/${id}`)
      .map((res: Response) => {
        return res;
      }).catch(this.handleError);
  }
}
