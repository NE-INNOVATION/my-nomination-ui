import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CommonService } from './common.service';
import { User } from './models/user.model';
import { Nomination } from './models/nomination.model';
import { NominationProgram } from './models/nomination-program.model';
import { EnvService } from 'src/environments/env.service';
import { ProgramCategory } from './models/program-category.model';
import { MoveNominationComponent } from '../move-nomination/move-nomination.component';
import { NominationMove } from './models/nomination-move.model';

@Injectable({
  providedIn: 'root',
})
export class NominationService {

  constructor(private _service: CommonService,private envService: EnvService) { }

  login(user:User) : Observable<User> {
     return this._service.post(`${this.envService.apiUrl}api/Programm/ValidateUser`, user);
  }

  submitNomination(nomination:Nomination) : Observable<Nomination> {
     return this._service.post(`${this.envService.apiUrl}api/Nomination/CreateNominations`, nomination );
 }

 MoveNominations(nominationMove:NominationMove) : Observable<boolean> {
  return this._service.post(`${this.envService.apiUrl}api/Nomination/MoveNominations`, nominationMove);
}

updateNomination(nomination:Nomination) : Observable<Nomination> {
  return this._service.post(`${this.envService.apiUrl}api/Nomination/UpdateNominations`, nomination );
}

updateProgram(program:NominationProgram) : Observable<NominationProgram> {
  return this._service.post(`${this.envService.apiUrl}api/Programm/UpdateProgram`, program );
}

deleteNominations(nomination:Nomination) : Observable<Nomination> {
  return this._service.post(`${this.envService.apiUrl}api/Nomination/DeleteNominations`, nomination );
}

 submitProgram(nomination:NominationProgram) : Observable<NominationProgram> {
  return this._service.post(`${this.envService.apiUrl}api/Programm/CreateProgram`, nomination );
}

 getPrograms(user:User) : Observable<NominationProgram[]> {
  return this._service.post(`${this.envService.apiUrl}api/Programm/GetPrograms`, user);
}

getAllPrograms() : Observable<NominationProgram[]> {
  return this._service.get(`${this.envService.apiUrl}api/Programm/GetAllPrograms`);
}

GetProgramsForCategories(categoryId:string) : Observable<NominationProgram[]> {
  return this._service.get(`${this.envService.apiUrl}api/Programm/GetProgramsForCategories?categoryId=` + categoryId);
}

GetAllProgramsCategories() : Observable<ProgramCategory[]> {
  return this._service.get(`${this.envService.apiUrl}api/Programm/GetAllProgramsCategories`);
}

getAllNominations() : Observable<Nomination[]> {
  return this._service.get(`${this.envService.apiUrl}api/Nomination/GetAllNominations`);
}

GetProgramsByUserId(user:User) : Observable<NominationProgram[]> {
  return this._service.post(`${this.envService.apiUrl}api/Programm/GetProgramsByUserId`, user);
}

getAllActiveProgram() : Observable<NominationProgram[]> {
  return this._service.get(`${this.envService.apiUrl}api/Programm/GetActivePrograms`);
}

getProgramById(programId:string) : Observable<NominationProgram> {
  return this._service.get(`${this.envService.apiUrl}api/Programm/GetProgramsById?programId=` + programId);
}

getNominations(programId:string) : Observable<Nomination[]> {
  return this._service.get(`${this.envService.apiUrl}api/Nomination/GetNominations?programId=` + programId);
}

getNominationDetails(programId:string,enterpriseId:string) : Observable<Nomination> {
  return this._service.get(`${this.envService.apiUrl}api/Nomination/GetNominationDetails?programId=` + programId + "&enterpriseId=" + enterpriseId);
}

 
}