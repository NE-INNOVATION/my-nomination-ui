import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NominationProgram,Status } from '../core/models/nomination-program.model';
import { NominationService } from '../core/nomination.service';
import { ViewImageComponent } from '../shared/view-image/view-image.component';

@Component({
  selector: 'app-setup-program',
  templateUrl: './setup-program.component.html',
  styleUrls: ['./setup-program.component.scss']
})
export class SetupProgramComponent implements OnInit {

  imageSrc: string;
  startDate = new Date();
  minStartDate = new Date();
  endDate = new Date();
  nominationStartDate = new Date();
  nominationEndDate = new Date();
  viewbanner : boolean = false;
  program:NominationProgram;
  maxStartDate = new Date(this.minStartDate.getMonth() + 2);
  status:number = Status.Draft;
  isPublished:boolean = false;


  setupForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl(''),
   fileSource: new FormControl(''),
   courseAgenda: new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required]),
   startDate: new FormControl('', [Validators.required]),
   endDate: new FormControl('', [Validators.required]),
   nominationStartDate: new FormControl('', [Validators.required]),
   nominationEndDate: new FormControl('', [Validators.required])
 });

  constructor(public dialog: MatDialog,
    private _service: NominationService,
    private _snackBar: MatSnackBar,
    private router: Router) {

      this.program = new NominationProgram()

     }

  ngOnInit(): void {
    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
        
    if(!isSuccefull){
      this.router.navigate([''])
    }

    let programId = sessionStorage.getItem("editprogramId");
    if(programId){
      this._service.getProgramById(programId).subscribe(
        response => {
          this.program = response;
          this.imageSrc = response.banner;
          this.status = response.status;
          this.isPublished = response.isPublished;
        })
    }

  }

  get f(){
    return this.setupForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        if(this.imageSrc){
          this.viewbanner = true;
        }
        this.setupForm.patchValue({
          fileSource: reader.result
        });
      };
   
    }

  }

  view(){
    const dialogRef = this.dialog.open(ViewImageComponent,{data : this.imageSrc});
  }

  submit(){

    if (this.setupForm.valid == false) {
       return;
    }

    let programId = sessionStorage.getItem("editprogramId");
    var nominationProgram:NominationProgram = {
      name : this.setupForm.get("name").value,
      description : this.setupForm.get("description").value,
      endDate : this.setupForm.get("endDate").value,
      startDate : this.setupForm.get("startDate").value,
      banner : this.imageSrc,
      nominationEndDate : this.setupForm.get("nominationEndDate").value,
      nominationStartDate : this.setupForm.get("nominationStartDate").value,
      courseAgenda : this.setupForm.get("courseAgenda").value,
      userId : sessionStorage.getItem("userId"),
      programId: (programId) ? programId :"",
      status : this.status,
      isPublished : this.isPublished
    }

    this._service.submitProgram(nominationProgram).subscribe(
      response => {
        if(response !=null && response.name){
          this.openSnackBar("Program submitted successfully","",15000);
          this.router.navigate(['/viewsetup'])
         }else{
          this.openSnackBar("Program submission failed or already exists","",15000);
         }
      },
      error => {
        this.openSnackBar("Program submission failed or already exists","",15000);
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
}
