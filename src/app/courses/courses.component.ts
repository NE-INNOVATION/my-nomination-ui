import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { NominationService } from '../core/nomination.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { MessageComponent } from '../shared/message/message.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  programms : NominationProgram[] = [];
  displayedColumns: string[] = ['programId','name', 'nominationStartDate','nominationEndDate','startDate', 'endDate','view','agenda','nominate'];
  dataSource = new MatTableDataSource<NominationProgram>(this.programms);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: NominationService,
    private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this._service.getAllActiveProgram().subscribe(
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

  view(description:string,title:string){
    this.dialog.open(MessageModalComponent)
    sessionStorage.setItem("dialogTitle","Program " + title);
    sessionStorage.setItem("dialogText",description);
}

  nominate(programId: string){
    this.router.navigate(['/nomination/'+ programId]);
  }

}
