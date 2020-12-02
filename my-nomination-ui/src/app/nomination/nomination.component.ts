import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { NominationService } from 'src/app/core/nomination.service';
import { Nomination } from '../core/models/nomination.model';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.scss']
})
export class NominationComponent implements OnInit {

  programId : number = 0;

  constructor(public dialog: MatDialog,private _service: NominationService,
    private route: ActivatedRoute,
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
  agreechecked:boolean = false;
  gender:string="1";
  role:string="";
  level:string="";

  ngOnInit(): void {
  
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    clientName: new FormControl('',Validators.required),
    managerId: new FormControl('',Validators.required),
    enterpriseId: new FormControl('',Validators.required),
    location: new FormControl(''),
    RadioFormControlgender: new FormControl('',Validators.required),
    selectFormControlRole: new FormControl(''),
    selectFormControlLevel: new FormControl(''),
    primarySkill: new FormControl('',Validators.required),
    secondarySkill: new FormControl(''),
    ia_ig: new FormControl('',Validators.required),
    project: new FormControl('',Validators.required),
    selectFormControlAgree: new FormControl('',Validators.required)
  });

  submit() {
    if (this.form.valid) {
      var nomination:Nomination = {
        name : this.form.get("name").value,
        clientName : this.form.get("clientName").value,
        role : this.role,
        enterpriseId : this.form.get("enterpriseId").value,
        location : this.form.get("location").value,
        ia_ig : this.form.get("ia_ig").value,
        managerId : this.form.get("managerId").value,
        primarySkill : this.form.get("primarySkill").value,
        secondarySkill : this.form.get("secondarySkill").value,
        project : this.form.get("project").value,
        gender : this.form.get("RadioFormControlgender").value,
        level : this.level,
        programId : this.programId

      }

     this._service.submitNomination(nomination).subscribe(
      response => {
        if(response !=null && response.name){
          sessionStorage.setItem("programId",this.programId.toString());
          this.openSnackBar("Nomination submitted successfully for " + response.name,"");
         }else{
          this.openSnackBar("Nomination failed or already exists for " + response.name,"");
         }
      },
      error => {
        this.openSnackBar("Nomination failed or already exists for " + nomination.name,"");
        console.log(error)
      } 
     );
      
    }
  }

  close(){
    this.dialog.closeAll();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
