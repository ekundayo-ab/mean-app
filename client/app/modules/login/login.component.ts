import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/matchers';
import { LoginData } from '../../interfaces/loginData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginData;

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginData = {
      password: '',
      email: ''
    };
  }

  ngOnInit() {}

  post() {
    if (this.email.valid && this.password.valid) {
      this.authService.loginUser(this.loginData)
        .toPromise()
        .then((res) => {
          const { user } = res;
          this.toastr.success('Login successful!', user.email);
          this.router.navigate(['/'])
        }).catch((err) => {
          this.toastr.error('Login failed!', err.message);
        })
    }
    return;
  }

}
