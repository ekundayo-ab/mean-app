import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Profile</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item>Name: {{profile?.name}}</mat-list-item>
          <mat-list-item>Email: {{profile?.email}}</mat-list-item>
          <mat-list-item>Description: {{profile?.description}}</mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Posts</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-messages></app-messages>
      </mat-card-content>
    </mat-card>
  `,
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor( public apiService: ApiService, public route: ActivatedRoute ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.apiService.getProfile(id)
    .toPromise()
    .then((profileData) => {
      this.profile = profileData;
    });
  }
}

interface Profile {
  name: string;
  email: string;
  description: string;
}
