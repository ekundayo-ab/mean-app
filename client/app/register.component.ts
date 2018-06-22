import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  registerData: RegisterData;
  errorMessage = '';

  constructor (public authService: AuthService, public router: Router) {
    this.registerData = {
      email: '',
      password: '',
      name: '',
      description: ''
    };
  }

  post() {
    this.authService.registerUser(this.registerData)
      .subscribe((res) => {
        console.log(res);
        // if (res.token) return this.router.navigate(['/users']);
        this.errorMessage = 'Login failed!'
        return this.errorMessage;
      });
  }
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  description: string;
}
