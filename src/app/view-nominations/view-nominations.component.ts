import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { Nomination } from '../core/models/nomination.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';
import { NominationDetailsComponent } from '../nomination-details/nomination-details.component';

import * as XLSX from 'xlsx';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-nominations',
  templateUrl: './view-nominations.component.html',
  styleUrls: ['./view-nominations.component.scss']
})
export class ViewNominationsComponent implements OnInit,AfterViewInit  {

  programms : NominationProgram[] = [];
  nominations : Nomination[]= [];
  displayedColumns: string[] = ['name', 'enterpriseId', 'ia_Ig','level','clientName', 'project','location', 'managerId','approved','view'];
  dataSource = new MatTableDataSource<Nomination>(this.nominations);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
  
  constructor(private _service: NominationService,public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) { 

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

  toggle(event: MatSlideToggleChange,programId:string,enterpriseId:string) {
    console.log('Toggle fired');
    let approved = event.checked
    let nomination = this.nominations.find(x=>x.programId == programId && x.enterpriseId == enterpriseId);

    nomination.approved = approved

    this._service.updateNomination(nomination).subscribe(
      response => {
        if(response !=null && response.name){
          if(!nomination.approved){
            this.openSnackBar("Nomination denied successfully for " + response.name,"",15000);
          }
          else{
            this.openSnackBar("Nomination approved successfully for " + response.name,"",15000);
          }
          
         }else{
          this.openSnackBar("Nomination failed or already exists for " + response.name,"",15000);
         }
      },
      error => {
        this.openSnackBar("Nomination failed or already exists for " + nomination.name,"",15000);
        console.log(error)
      } 
     );
  }

  openSnackBar(message: string, action: string,duration : number) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar'
    });
  }

  exportToExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'nominations.xlsx');
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
