import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NominationProgram } from '../core/models/nomination-program.model';
import { ProgramService } from '../core/program.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit,AfterViewInit {

  programms : NominationProgram[] = [];
  completedProgramms : NominationProgram[] = [];
  displayedColumns: string[] = ['programId','name','startDate', 'endDate','view','agenda','nominate'];
  completedDisplayedColumns: string[] = ['programId','name','startDate', 'endDate','view','agenda'];
  dataSource = new MatTableDataSource<NominationProgram>(this.programms);
  compeletedDataSource = new MatTableDataSource<NominationProgram>(this.completedProgramms);
  checked : boolean = false;

  program : NominationProgram;
  selectedOption : string = "";

  @ViewChild('activePaginator', { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild('completedPaginator', { read: MatPaginator }) completedPaginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: ProgramService,
    private router: Router,public dialog: MatDialog,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._service.getAllActiveProgram().subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.programms = response as NominationProgram[];
          this.dataSource = new MatTableDataSource<NominationProgram>(this.programms);
          this.dataSource.paginator = this.paginator;
          this.cdr.detectChanges();
         }
      },
      error => {
        console.log(error)
      } 
     );

     this._service.getAllCompletedProgram().subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.completedProgramms = response as NominationProgram[];
          this.compeletedDataSource = new MatTableDataSource<NominationProgram>(this.completedProgramms);
          this.compeletedDataSource.paginator = this.completedPaginator;
          this.cdr.detectChanges();
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.compeletedDataSource.paginator = this.completedPaginator;
  }

}
