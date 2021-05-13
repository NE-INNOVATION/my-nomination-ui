import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NominationService } from 'src/app/core/nomination.service';
import { Nomination } from '../core/models/nomination.model';
import { TermConditionsComponent } from '../term-conditions/term-conditions.component';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.scss']
})
export class NominationComponent implements OnInit {

  programId : string = "";
  imageSrc:any = ""

  constructor(public dialog: MatDialog,private _service: NominationService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) {

      route.params.subscribe(
        (params) => {
          console.log("params.get('id')", params['id']);
          this.programId = params['id'];
        });

     }

  errorLabel : string = "";
  selectFormControlRole = new FormControl('', Validators.required);
  selectFormControlLevel = new FormControl('', Validators.required);
  selectFormControlAgree = new FormControl('', Validators.requiredTrue);
  selectFormControlBusinessGroup= new FormControl('');

  agreechecked:boolean = false;  
  role:string="";
  level:string="";
  bussinessGroup:string="";
  programName : string = "";
  startDate : string = "";
  endDate : string = "";

  ngOnInit(): void {
    this._service.getProgramById(this.programId).subscribe(
      response => {
        if(response !=null && response.name){
          this.programName = response.name;
          this.startDate = response.startDate
          this.endDate = response.endDate

          let startDate = new Date(response.startDate); 
          let today = new Date();
          if(startDate < today){
            this.router.navigate(['/message'], {state: {data: "Start date is already passed for program " + response.name}});
          }

          if(response.isClosed){
            this.router.navigate(['/message'], {state: {data: "Registration is closed for program " + response.name}});
          }

          sessionStorage.setItem("programId",this.programId.toString());
          this.imageSrc = response.banner;
        
          }else{
          this.openSnackBar("Program does not exists for " + this.programId,"",15000);
          this.router.navigate(['/message'], {state: {data: "Program does not exists for " + this.programId}});
         }
      },
      error => {
        console.log(error)
      } 
     );

  }
  
  checkValue(agreechecked:boolean){
    if(agreechecked){
      this.dialog.open(TermConditionsComponent);
    }
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    clientName: new FormControl('',Validators.required),
    managerId: new FormControl('',Validators.required),
    enterpriseId: new FormControl('',Validators.required),
    location: new FormControl(''),
    selectFormControlRole: new FormControl(''),
    selectFormControlLevel: new FormControl(''),
    primarySkill: new FormControl('',Validators.required),
    secondarySkill: new FormControl(''),
    selectFormControlBusinessGroup: new FormControl(''),
    project: new FormControl('',Validators.required),
    approver: new FormControl('',Validators.required),
    selectFormControlAgree: new FormControl('',Validators.required)
  });

  submit() {
    
    if(this.agreechecked === false){
      this.openSnackBar("Please agree term and policies","",4000);
      return;
    }

    if (this.form.valid) {
      var nomination:Nomination = {
        name : this.form.get("name").value,
        clientName : this.form.get("clientName").value,
        role : this.role,
        enterpriseId : this.form.get("enterpriseId").value,
        location : this.form.get("location").value,
        bussinessGroup : this.bussinessGroup,
        managerId : this.form.get("managerId").value,
        primarySkill : this.form.get("primarySkill").value,
        secondarySkill : this.form.get("secondarySkill").value,
        project : this.form.get("project").value,
        approver : this.form.get("approver").value,
        level : this.level,
        programId : this.programId,
        approved:false
      }

     this._service.submitNomination(nomination).subscribe(
      response => {
        if(response !=null && response.name){
          sessionStorage.setItem("programId",this.programId.toString());
          this.openSnackBar("Nomination submitted successfully for " + response.name,"",15000);
          this.router.navigate(['/message'], {state: {data: "Thank you for the nomination, you will receive an email to confirm your nomination shortly"}});
         }else{
          this.openSnackBar("Nomination failed or already exists for " + response.name,"",15000);
          this.router.navigate(['/message'], {state: {data: "Nomination failed or already exists for " + response.name}});
         }
      },
      error => {
        this.openSnackBar("Nomination failed or already exists for " + nomination.name,"",15000);
        this.router.navigate(['/message'], {state: {data: "Nomination failed or already exists for " + nomination.name}});
        console.log(error)
      } 
     );
      
    }
  }

  openSnackBar(message: string, action: string,duration : number) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: 'snackbar'
    });
  }

}
