import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  url = 'http://localhost:8888/api/v1/';

  constructor(private http: Http) { }

  signup(name, email, password) {
    return this.http.post(this.url + 'createUser',
    { name: name, email: email, password: password, verified: 'No'});
  }

  login(email, password) {
    return this.http.post(this.url + 'getUser',
    { email: email, password: password });
  }

  getDetails() {
    return this.http.post(this.url + 'getDetails',
    {email: localStorage.getItem('email')});
  }

  changePassword(password, newPassword) {
    return this.http.put(this.url + 'changePassword',
      { email: localStorage.getItem('email'), password: password, newPassword: newPassword });
  }

  resetPassword(email) {
    return this.http.put(this.url + 'resetPassword',
      { email: email, password: Math.random().toString(36).substring(3) });
  }

  verifyEmail() {
    return this.http.put(this.url + 'verifyEmail',
    { email: localStorage.getItem('email') });
  }

  isLoggedIn() {
    return localStorage.getItem('email') ? true : false;
  }
}
