import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CommonService } from './common.service';
import { User } from './models/user.model';
import { environment } from './../../environments/environment';
import { Nomination } from './models/nomination.model';
import { NominationProgram } from './models/nomination-program.model';

@Injectable({
  providedIn: 'root',
})
export class NominationService {

  constructor(private _service: CommonService) { }

  login(user:User) : Observable<User> {
     return this._service.post(`${environment.serviceUrl}api/Programm/ValidateUser`, user);
  }

  submitNomination(nomination:Nomination) : Observable<Nomination> {
     return this._service.post(`${environment.serviceUrl}api/Nomination/CreateNominations`, nomination );
 }

 getPrograms(user:User) : Observable<NominationProgram[]> {
  return this._service.post(`${environment.serviceUrl}api/Programm/GetPrograms`, user);
}

getNominations(programId:string) : Observable<Nomination[]> {
  return this._service.get(`${environment.serviceUrl}api/Nomination/GetNominations?programId=` + programId);
}

getNominationDetails(programId:string,enterpriseId:string) : Observable<Nomination> {
  return this._service.get(`${environment.serviceUrl}api/Nomination/GetNominationDetails?programId=` + programId + "&enterpriseId=" + enterpriseId);
}

 
}