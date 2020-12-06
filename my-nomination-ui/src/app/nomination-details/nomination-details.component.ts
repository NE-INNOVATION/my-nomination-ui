import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Nomination } from '../core/models/nomination.model';
import { NominationService } from '../core/nomination.service';

@Component({
  selector: 'app-nomination-details',
  templateUrl: './nomination-details.component.html',
  styleUrls: ['./nomination-details.component.scss']
})
export class NominationDetailsComponent implements OnInit {

  constructor(private _service: NominationService,
    public dialog: MatDialog) { }

  nomination : Nomination

  ngOnInit(): void {
    let programId = sessionStorage.getItem("programId");
    let enterpriseId = sessionStorage.getItem("enterpriseId");

    this._service.getNominationDetails(programId,enterpriseId).subscribe(
      response => {
        if(response !=null){
          this.nomination = response as Nomination;
         }
      },
      error => {
        console.log(error)
      } 
     );

  }

  close(){
    this.dialog.closeAll();
  }

}
