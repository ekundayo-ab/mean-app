import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile.component';
import { PostComponent } from './modules/post/post.component';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './authInterceptor.service';
import { routes } from './app-routes';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
  ],
  providers: [
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
