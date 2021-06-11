import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { User } from './models/user.model';
import { NominationProgram } from './models/nomination-program.model';
import { EnvService } from 'src/environments/env.service';
import { ProgramCategory } from './models/program-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(
    private _service: CommonService,
    private envService: EnvService
  ) {}

  login(user: User): Observable<User> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/ValidateUser`,
      user
    );
  }

  updateProgram(program: NominationProgram): Observable<NominationProgram> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/UpdateProgram`,
      program
    );
  }

  submitProgram(nomination: NominationProgram): Observable<NominationProgram> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/CreateProgram`,
      nomination
    );
  }

  getPrograms(user: User): Observable<NominationProgram[]> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/GetPrograms`,
      user
    );
  }

  getAllPrograms(): Observable<NominationProgram[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetAllPrograms`
    );
  }

  getAllUsers(): Observable<User[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetAllUsers`
    );
  }

  GetProgramsForCategories(
    categoryId: string
  ): Observable<NominationProgram[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetProgramsForCategories?categoryId=` +
        categoryId
    );
  }

  GetAllProgramsCategories(user: User): Observable<ProgramCategory[]> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/GetAllProgramsCategories`,
      user
    );
  }

  GetProgramsByUserId(user: User): Observable<NominationProgram[]> {
    return this._service.post(
      `${this.envService.apiUrl}api/Programm/GetProgramsByUserId`,
      user
    );
  }

  getAllActiveProgram(): Observable<NominationProgram[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetActivePrograms`
    );
  }

  getAllCompletedProgram(): Observable<NominationProgram[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetCompletedPrograms`
    );
  }

  getProgramById(programId: string): Observable<NominationProgram> {
    return this._service.get(
      `${this.envService.apiUrl}api/Programm/GetProgramsById?programId=` +
        programId
    );
  }
}
