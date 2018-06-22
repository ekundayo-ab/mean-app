import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/matchers';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    public router: Router
  ) {}

  postMessage: String = '';
  messages: Array<object> = [];

  message = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.apiService.getMessages(sessionStorage.getItem('id'))
      .subscribe((res) => {
        this.messages = res;
      });
  }

  post() {
    if (this.message.valid) {
      this.apiService.postMessage({ message:this.postMessage })
        .toPromise()
        .then((res) => {
          res.post.tag = true;
          this.messages.push(res.post);
        });
    }
    return;
  }
}
