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
         MatListModule, MatToolbarModule,
         MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RequestOptions } from '@angular/http';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent
  },
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
    component: ContactListComponent,
  },
  {
    path: 'contact-add',
    component: ContactEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-edit',
    component: ContactEditComponent,
    canActivate: [AuthGuard]
  }

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
    LoginComponent,
    SignUpComponent
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
    ContactService, AuthenticationService, TokenStorage, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
