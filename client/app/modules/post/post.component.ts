import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html'
})

export class PostComponent {
  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    public router: Router
  ) {}

  postMessage: String = '';
  ngOnInit() {
    console.log(this.authService.isAuthenticated);
  }

  post() {
    this.apiService.postMessage({ message: this.postMessage });
  }
}
