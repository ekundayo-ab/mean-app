import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  constructor( public authService: AuthService ) {}

  registerData: RegisterData;

  post() {
    this.authService.registerUser(this.registerData);
  }
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  description: string;
}
