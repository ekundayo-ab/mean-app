import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of apiService.users">
    <mat-card [routerLink]="['/users', user._id]" style="cursor:pointer" >{{user.name}}</mat-card>
    </div>
  `,
})

export class UsersComponent implements OnInit {
  constructor( public apiService: ApiService ) {}

  ngOnInit() {
    this.apiService.getUsers();
  }
}
