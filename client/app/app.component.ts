import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      <button mat-button routerLink="/">PSSocial</button>
      <button routerLink="/users" mat-button>Users</button>
      <span style="flex: 1 1 auto"></span>
      <button *ngIf="!authService.isAuthenticated" routerLink="/register" mat-button>Register</button>
      <button *ngIf="!authService.isAuthenticated" routerLink="/login" mat-button>Login</button>
      <button *ngIf="authService.isAuthenticated" (click)="authService.logout()" mat-button>Logout</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'my app';

  constructor( public authService: AuthService ) {}
}
