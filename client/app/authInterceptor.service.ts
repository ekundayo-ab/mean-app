import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(req, next) {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `token ${this.auth.token}`)
    });
    return next.handle(authRequest);
  }
}
