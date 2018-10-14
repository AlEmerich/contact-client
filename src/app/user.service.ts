import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('//localhost:8080/users');
  }
}
