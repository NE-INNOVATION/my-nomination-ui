import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { Nomination } from './models/nomination.model';
import { EnvService } from 'src/environments/env.service';
import { NominationMove } from './models/nomination-move.model';

@Injectable({
  providedIn: 'root',
})
export class NominationService {
  constructor(
    private _service: CommonService,
    private envService: EnvService
  ) {}

  submitNomination(nomination: Nomination): Observable<Nomination> {
    return this._service.post(
      `${this.envService.apiUrl}api/Nomination/CreateNominations`,
      nomination
    );
  }

  MoveNominations(nominationMove: NominationMove): Observable<boolean> {
    return this._service.post(
      `${this.envService.apiUrl}api/Nomination/MoveNominations`,
      nominationMove
    );
  }

  updateNomination(nomination: Nomination): Observable<Nomination> {
    return this._service.post(
      `${this.envService.apiUrl}api/Nomination/UpdateNominations`,
      nomination
    );
  }

  deleteNominations(nomination: Nomination): Observable<Nomination> {
    return this._service.post(
      `${this.envService.apiUrl}api/Nomination/DeleteNominations`,
      nomination
    );
  }

  getAllNominations(): Observable<Nomination[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Nomination/GetAllNominations`
    );
  }

  getNominations(programId: string): Observable<Nomination[]> {
    return this._service.get(
      `${this.envService.apiUrl}api/Nomination/GetNominations?programId=` +
        programId
    );
  }

  getNominationDetails(
    programId: string,
    enterpriseId: string
  ): Observable<Nomination> {
    return this._service.get(
      `${this.envService.apiUrl}api/Nomination/GetNominationDetails?programId=` +
        programId +
        '&enterpriseId=' +
        enterpriseId
    );
  }
}
