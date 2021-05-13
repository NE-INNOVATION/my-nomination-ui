import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram, Status } from '../core/models/nomination-program.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-setup',
  templateUrl: './view-setup.component.html',
  styleUrls: ['./view-setup.component.scss']
})
export class ViewSetupComponent implements OnInit,AfterViewInit {

  programms : NominationProgram[] = [];
  displayedColumns: string[] = ['programId','name', 'userId','startDate', 'endDate','view','publish','close','status','edit','delete'];
  dataSource = new MatTableDataSource<NominationProgram>(this.programms);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: NominationService,
    private router: Router,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
   
        
    if(!isSuccefull){
      this.router.navigate([''])
      return;
    }

    let user:User = new User ();
    user.userId = sessionStorage.getItem("userId");
    user.role = sessionStorage.getItem("userRole");

    this._service.GetProgramsByUserId(user).subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.programms = response as NominationProgram[];
          this.dataSource = new MatTableDataSource<NominationProgram>(this.programms);
          this.dataSource.paginator = this.paginator;
         }
      },
      error => {
        console.log(error)
      } 
     );
  }

  view(description:string){
    this.dialog.open(MessageModalComponent)
    sessionStorage.setItem("dialogTitle","Program Description");
    sessionStorage.setItem("dialogText",description);
}

  edit(programId : string){
    sessionStorage.setItem("editprogramId",programId);
    this.router.navigate(['/setup'])
  }

  publish(event: MatSlideToggleChange,programId:string){
    console.log('Toggle fired');
    let isPublished = event.checked
    let program = this.programms.find(x=>x.programId == programId);

    program.isPublished = isPublished
    if(event.checked){
      program.status = Status.Active;
    }
   
    this._service.updateProgram(program).subscribe(
      response => {
        if(response !=null && response.name){
          this.openSnackBar("Program published successfully for " + response.name,"",15000);
         }else{
          this.openSnackBar("Publish failed for " + response.name,"",15000);
         }
      },
      error => {
        this.openSnackBar("Publish failed for " + program.name,"",15000);
        console.log(error)
      } 
     );
  }

  closeRegistration(event: MatSlideToggleChange,programId:string){
    console.log('Toggle fired');
    let isClosed = event.checked
    let program = this.programms.find(x=>x.programId == programId);

    program.isClosed = isClosed
   
    this._service.updateProgram(program).subscribe(
      response => {
        if(response !=null && response.name){
          if(isClosed){
            this.openSnackBar("Program registration closed successfully for " + response.name,"",15000);
          }else{
            this.openSnackBar("Program registration activated successfully for " + response.name,"",15000);
          }
         }else{
          this.openSnackBar("Program registration closed failed for " + response.name,"",15000);
         }
      },
      error => {
        this.openSnackBar("Program registration closed failed for " + program.name,"",15000);
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

  confirmDialog(programId:string): void {

    let program = this.programms.find(x=>x.programId == programId);

    const message = `Are you sure you want to delete this program?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
       if(dialogResult){
        program.status = Status.Deleted;
           
        this._service.updateProgram(program).subscribe(
          response => {
            if(response !=null && response.name){
              this.openSnackBar("Program deleted successfully","",15000);
             }else{
              this.openSnackBar("Deletion for " + response.name,"",15000);
             }
          },
          error => {
            this.openSnackBar("Deletion failed for " + program.name,"",15000);
            console.log(error)
          } 
         );
       }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addProgram(){
    this.router.navigate(['/setup'])
    sessionStorage.setItem("editprogramId","");
  }

}
