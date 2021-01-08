import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { User } from '../core/models/user.model';
import { NominationService } from '../core/nomination.service';

@Component({
  selector: 'app-view-setup',
  templateUrl: './view-setup.component.html',
  styleUrls: ['./view-setup.component.scss']
})
export class ViewSetupComponent implements OnInit {

  programms : NominationProgram[] = [];
  displayedColumns: string[] = ['programId','name', 'userId', 'nominationStartDate','nominationEndDate','startDate', 'endDate','description','edit'];
  dataSource = new MatTableDataSource<NominationProgram>(this.programms);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _service: NominationService,
    private router: Router) { }

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
          this.dataSource = new MatTableDataSource<NominationProgram>(this.programms);
         }
      },
      error => {
        console.log(error)
      } 
     );
  }

  addProgram(){
    this.router.navigate(['/setup'])
  }

}
