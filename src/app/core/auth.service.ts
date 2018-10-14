import { Injectable } from '@angular/core';
import { RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(user: string, pwd: string) {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = { username: user, password: pwd };

    return this.http.post<any>('//localhost:8080/login',
                               body,
                               { headers: headers })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
