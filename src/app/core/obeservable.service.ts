import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
    providedIn: 'root',
  })
export class ObervableService {
  private _doLogin = new BehaviorSubject<User>({
    password : "",
    userId :sessionStorage.getItem("userId"),
    role:sessionStorage.getItem("userRole")});
 
  constructor() {}

  get doLogin() {
    return this._doLogin.asObservable();
  }

  setUser(user:User) {
    this._doLogin.next(Object.assign({}, user));
  }
}