import { ContactService } from './contact.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './core/auth.service';
import { JwtInterceptor } from './core/app.interceptor';
import { TokenStorage } from './core/token.storage';
import { AuthGuard } from './core/auth.guard';
import { AuthErrorHandler } from './core/auth-error-handler';

// Angular Material
import { MatButtonModule, MatCardModule, MatInputModule,
         MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RequestOptions } from '@angular/http';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/contact-list',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-list',
    component: ContactEditComponent,
  },
  {
    path: 'contact-add',
    component: ContactEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-edit?id=:id',
    component: ContactEditComponent,
    canActivate: [AuthGuard]
  },

]

export function tokenGetter()
{
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/sign-up/']
      }
    })
  ],
  providers: [
    ContactService, AuthenticationService, TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
