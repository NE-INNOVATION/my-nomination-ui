import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NominationProgram } from '../core/models/nomination-program.model';
import { NominationService } from '../core/nomination.service';
import { ViewImageComponent } from '../shared/view-image/view-image.component';

@Component({
  selector: 'app-setup-program',
  templateUrl: './setup-program.component.html',
  styleUrls: ['./setup-program.component.scss']
})
export class SetupProgramComponent implements OnInit {

  imageSrc: string;
  startDate = new Date(1990, 0, 1);
  endDate = new Date(1990, 0, 1);
  nominationStartDate = new Date(1990, 0, 1);
  nominationEndDate = new Date(1990, 0, 1);
  viewbanner : boolean = false;


  setupForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required]),
   courseAgenda: new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required]),
   startDate: new FormControl('', [Validators.required]),
   endDate: new FormControl('', [Validators.required]),
   nominationStartDate: new FormControl('', [Validators.required]),
   nominationEndDate: new FormControl('', [Validators.required])
 });

  constructor(public dialog: MatDialog,
    private _service: NominationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  get f(){
    return this.setupForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      if(event.target.files[0].type !== "image/jpeg" || event.target.files[0].type !== "image/png"){
        alert("Plase upload valid jpeg/png file");
        this.f.file.errors.required = true;
        return;
      }

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
      programId:""
    }

    this._service.submitProgram(nominationProgram).subscribe(
      response => {
        if(response !=null && response.name){
          this.openSnackBar("Nomination submitted successfully for " + response.name,"",15000);
         }else{
          this.openSnackBar("Nomination failed or already exists for " + response.name,"",15000);
         }
      },
      error => {
        this.openSnackBar("Nomination failed or already exists for " + nominationProgram.name,"",15000);
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
