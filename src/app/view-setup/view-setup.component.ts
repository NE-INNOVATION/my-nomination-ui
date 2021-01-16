import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-view-setup',
  templateUrl: './view-setup.component.html',
  styleUrls: ['./view-setup.component.scss']
})
export class ViewSetupComponent implements OnInit,AfterViewInit {

  programms : NominationProgram[] = [];
  displayedColumns: string[] = ['programId','name', 'userId', 'nominationStartDate','nominationEndDate','startDate', 'endDate','view','edit'];
  dataSource = new MatTableDataSource<NominationProgram>(this.programms);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: NominationService,
    private router: Router,public dialog: MatDialog) { }

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addProgram(){
    this.router.navigate(['/setup'])
    sessionStorage.setItem("editprogramId","");
  }

}
