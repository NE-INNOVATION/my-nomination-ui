import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { Nomination } from '../core/models/nomination.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';
import { NominationDetailsComponent } from '../nomination-details/nomination-details.component';
import { NominationComponent } from '../nomination/nomination.component';

@Component({
  selector: 'app-view-nominations',
  templateUrl: './view-nominations.component.html',
  styleUrls: ['./view-nominations.component.scss']
})
export class ViewNominationsComponent implements OnInit,AfterViewInit  {

  programms : NominationProgram[] = [];
  nominations : Nomination[]= [];
  displayedColumns: string[] = ['name', 'enterpriseId', 'role','level','clientName', 'project','location', 'managerId','view'];
  dataSource = new MatTableDataSource<Nomination>(this.nominations);

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _service: NominationService,public dialog: MatDialog,
    private router: Router) { 

  }

  ngOnInit(): void {

    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
   
        
    if(!isSuccefull){
      this.router.navigate([''])
      return;
    }

    let user:User = new User ();
    user.userId = sessionStorage.getItem("userId");
    user.role = sessionStorage.getItem("userRole");

    this._service.getPrograms(user).subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.programms = response as NominationProgram[];
          this.onChange(this.programms[0].programId);
          this.selectedOption = this.programms[0].programId;
         }
      },
      error => {
        console.log(error)
      } 
     );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(programId : string, enterpriseId : string){
    sessionStorage.setItem("programId",programId);
    sessionStorage.setItem("enterpriseId",enterpriseId)
    const dialogRef = this.dialog.open(NominationDetailsComponent);
  }

  onChange(programId : string){
    this.program = this.programms.filter(
      program => program.programId === programId)[0];

      this._service.getNominations(programId).subscribe(
        response => {
          if(response !=null && response.length > 0){
            this.nominations = response as Nomination[];
           }
           else
           {
            this.nominations = [];
            }
           this.dataSource = new MatTableDataSource<Nomination>(this.nominations);
        },
        error => {
          console.log(error)
        } 
       );
  }


  
}
