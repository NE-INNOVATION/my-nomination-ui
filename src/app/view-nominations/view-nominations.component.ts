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
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MoveNominationComponent } from '../move-nomination/move-nomination.component';
import { NominationMove } from '../core/models/nomination-move.model';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-view-nominations',
  templateUrl: './view-nominations.component.html',
  styleUrls: ['./view-nominations.component.scss']
})
export class ViewNominationsComponent implements OnInit, AfterViewInit {

  programms: NominationProgram[] = [];
  nominations: Nomination[] = [];
  nominationsMove: Nomination[] = [];
  displayedColumns: string[] = ['move', 'name', 'enterpriseId', 'bussinessGroup', 'level', 'clientName', 'project', 'location', 'managerId', 'approved', 'role', 'primarySkill', 'secondarySkill', 'programId', 'view', 'delete'];
  dataSource = new MatTableDataSource<Nomination>(this.nominations);
  checked: boolean = false;

  program: NominationProgram;
  selectedOption: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: NominationService, public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));


    if (!isSuccefull) {
      this.router.navigate([''])
      return;
    }

   this.getProgramsForUser();

  }

  getProgramsForUser(){
    let user: User = new User();
    user.userId = sessionStorage.getItem("userId");
    user.role = sessionStorage.getItem("userRole");

    this._service.getPrograms(user).subscribe(
      response => {
        if (response != null && response.length > 0) {
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

  showOptions(event: MatCheckbox, nomination: Nomination): void {
    console.log(event.checked);
    if (event.checked) {
      this.nominationsMove.push(nomination);
    } else {
      this.RemoveElementFromObjectArray(nomination.enterpriseId);
    }
  }

  moveNominations() {
    let movedata = new NominationMove();
    movedata.categoryId = this.program.categoryId;
    movedata.nominations = this.nominationsMove
    movedata.program = this.program;

    let programToMove = this.programms.find(x => x.categoryId == this.program.categoryId
      && x.programId != this.program.programId);

    if (!programToMove) {
      sessionStorage.setItem("dialogTitle", "Move Nominations");
      sessionStorage.setItem("dialogText", "No other program is available with same category");
      this.dialog.open(MessageModalComponent)
      return;
    }

    const dialogRef = this.dialog.open(MoveNominationComponent, {
      data: movedata,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.onChange(movedata.program.programId);
      }
    });

  }

  RemoveElementFromObjectArray(entId: string) {
    this.nominationsMove.forEach((value, index) => {
      if (value.enterpriseId == entId) this.nominationsMove.splice(index, 1);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(programId: string, enterpriseId: string) {
    sessionStorage.setItem("programId", programId);
    sessionStorage.setItem("enterpriseId", enterpriseId)
    const dialogRef = this.dialog.open(NominationDetailsComponent);
  }

  toggle(event: MatSlideToggleChange, programId: string, enterpriseId: string) {
    console.log('Toggle fired');
    let approved = event.checked
    let nomination = this.nominations.find(x => x.programId == programId && x.enterpriseId == enterpriseId);

    nomination.approved = approved

    this._service.updateNomination(nomination).subscribe(
      response => {
        if (response != null && response.name) {
          if (!nomination.approved) {
            this.openSnackBar("Nomination denied successfully for " + response.name, "", 15000);
          }
          else {
            this.openSnackBar("Nomination approved successfully for " + response.name, "", 15000);
          }

        } else {
          this.openSnackBar("Nomination failed or already exists for " + response.name, "", 15000);
        }
      },
      error => {
        this.openSnackBar("Nomination failed or already exists for " + nomination.name, "", 15000);
        console.log(error)
      }
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar'
    });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'nominations.xlsx');
  }

  confirmDialog(programId: string, enterpriseId: string): void {

    let nomination = this.nominations.find(x => x.programId == programId && x.enterpriseId == enterpriseId);

    const message = `Are you sure you want to delete this nomination permanently?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

        this._service.deleteNominations(nomination).subscribe(
          response => {
            if (response != null && response.name) {
              this.openSnackBar("Nomination deleted successfully", "", 15000);
              this.onChange(this.selectedOption);
            } else {
              this.openSnackBar("Deletion failed for " + response.name, "", 15000);
            }
          },
          error => {
            this.openSnackBar("Deletion failed for " + nomination.name, "", 15000);
            console.log(error)
          }
        );
      }
    });
  }

  onChange(programId: string) {
    this.program = this.programms.filter(
      program => program.programId === programId)[0];

    this._service.getNominations(programId).subscribe(
      response => {
        if (response != null && response.length > 0) {
          this.nominations = response as Nomination[];
          this.nominationsMove = [];
        }
        else {
          this.nominations = [];
        }
        this.dataSource = new MatTableDataSource<Nomination>(this.nominations);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error)
      }
    );
  }



}
