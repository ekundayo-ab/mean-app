import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Login</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
      <form>
        <mat-input-container>
          <input [(ngModel)]="loginData.email" name="email" matInput placeholder="email" >
        </mat-input-container>
        <mat-input-container>
          <input [(ngModel)]="loginData.password" matInput name="password" placeholder="password">
        </mat-input-container>
        <button (click)="post()" mat-raised-button password="email" color="primary">Login</button>
      </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class LoginComponent {
  constructor( public authService: AuthService ) {}

  loginData: LoginData;

  post() {
    this.authService.loginUser(this.loginData);
  }

}
interface LoginData {
  name: string;
  password: string;
  email: string;
}
