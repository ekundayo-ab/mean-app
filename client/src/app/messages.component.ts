import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-messages',
  template: `
    <div *ngFor="let message of apiService.messages">
    <mat-card>{{message.message}}</mat-card>
    </div>
  `,
})

export class MessagesComponent implements OnInit {
  constructor( private apiService: ApiService, private route: ActivatedRoute ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessages(userId);
  }
}
