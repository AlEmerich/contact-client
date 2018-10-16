import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';
import { Response } from '@angular/http';

import { AuthenticationService } from '../core/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = '/login';
    }

    signup() {
      this.loading = true;
      this.authenticationService.signout(
        this.model.username, this.model.password)
        .subscribe(
          res => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
}
