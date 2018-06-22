import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/matchers';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  registerData: RegisterData;
  errorMessage = '';
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);
  name = new FormControl('', [
    Validators.required,
  ]);
  description = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor (
    public authService: AuthService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.registerData = {
      email: '',
      password: '',
      name: '',
      description: ''
    };
  }

  post() {
    if (this.email.valid && this.password.valid && this.description.valid && this.name.valid) {
      this.authService.registerUser(this.registerData)
        .toPromise()
        .then((res) => {
          this.toastr.success('Registration success!', 'Welcome In');
          return this.router.navigate(['/']);
        }).catch((err) => {
          this.toastr.error('Registration failed!', err.message);
        })
    }
    return;
  }
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  description: string;
}
