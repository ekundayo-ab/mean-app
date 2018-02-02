import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-posts',
  template: `
    <mat-card *ngIf="authService.isAuthenticated; else postInfo" >
      <mat-card-header>
        <mat-card-title>
          <h4>New Post</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
      <form>
        <mat-input-container style="width: 100%">
          <textarea [(ngModel)]="postMessage" matInput name="postMessage" placeholder="Message">
          </textarea>
        </mat-input-container>
        <br />
        <button (click)="post()" mat-raised-button color="primary">Post</button>
      </form>
      </mat-card-content>
    </mat-card>
    <ng-template #postInfo>
      <mat-card>
        <h3>Register or Login to start posting messages!</h3>
      </mat-card>
    </ng-template>
  `,
})

export class PostComponent {
  constructor( private apiService: ApiService, private authService: AuthService ) {}
  postMessage: String = '';

  post() {
    this.apiService.postMessage({ message: this.postMessage });
  }
}
