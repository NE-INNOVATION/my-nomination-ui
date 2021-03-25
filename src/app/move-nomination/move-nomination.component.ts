import { Component, inject, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NominationMove } from '../core/models/nomination-move.model';
import { NominationProgram } from '../core/models/nomination-program.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';

@Component({
  selector: 'app-move-nomination',
  templateUrl: './move-nomination.component.html',
  styleUrls: ['./move-nomination.component.scss']
})
export class MoveNominationComponent implements OnInit {

  constructor(private router: Router,
    private _service: NominationService,
    @Inject(MAT_DIALOG_DATA) public data: NominationMove,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MoveNominationComponent>) { }

  programms : NominationProgram[] = [];
  selectedOption : string = "";
  program : NominationProgram;

  ngOnInit(): void {
    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
           
    if(!isSuccefull){
      this.router.navigate([''])
      return;
    }

    let user:User = new User ();
    user.userId = sessionStorage.getItem("userId");
    user.role = sessionStorage.getItem("userRole");

    this._service.GetProgramsForCategories(this.data.categoryId).subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.programms = response as NominationProgram[];
          this.RemoveElementFromObjectArray(this.data.program.programId)
          this.selectedOption = this.programms[0].programId;
          this.onChange(this.selectedOption);
         }
      },
      error => {
        console.log(error)
      } 
     );
  }

  RemoveElementFromObjectArray(programId: string) {
    this.programms.forEach((value,index)=>{
        if(value.programId==programId) this.programms.splice(index,1);
    });
  }

  onChange(programId : string){
    this.program = this.programms.filter(
      program => program.programId === programId)[0];
 
      this.selectedOption = programId;
      
  }

  close(){
    this.dialogRef.close();
  }

  moveNominations(){
    let moveNomination = new NominationMove();
    moveNomination.nominations = this.data.nominations
    moveNomination.categoryId = this.data.categoryId;
    moveNomination.program = this.program;

    this._service.MoveNominations(moveNomination).subscribe(
      response => {
        if(response !=null){
          this.openSnackBar("Nominations moved successfully to program " + this.program.name,"",15000);
          this.dialogRef.close(true);
         }
      },
      error => {
        this.openSnackBar("Nominations moved failed for program " + this.program.name,"",15000);
        console.log(error);
        this.dialogRef.close(false);
      });
   }
  

  openSnackBar(message: string, action: string,duration : number) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar'
    });
  }

}
