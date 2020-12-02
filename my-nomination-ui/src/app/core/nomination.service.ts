import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { CommonService } from './common.service';
import { User } from './models/user.model';
import { environment } from './../../environments/environment';
import { map, catchError, tap } from "rxjs/operators";
import { Nomination } from './models/nomination.model';

@Injectable({
  providedIn: 'root',
})
export class NominationService {

  constructor(private _service: CommonService) { }

  login(user:User) : Observable<User> {
     return this._service.post(`${environment.serviceUrl}api/Programm/ValidateUser`, user);
  }

  submitNomination(nomination:Nomination) : Observable<Nomination> {
    return this._service.post(`${environment.serviceUrl}api/Programm/CreateNominations`, nomination);
 }
 
}