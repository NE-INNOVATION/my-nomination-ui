import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NominationProgram,Status } from '../core/models/nomination-program.model';
import { ProgramCategory } from '../core/models/program-category.model';
import { User } from '../core/models/user.model';
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
  isClosed:boolean = false;
  selectedCategory:string = "";
  programCategories:ProgramCategory[] = [];
  selectFormControlCategory = new FormControl('', Validators.required);
  userId: string = '';

  setupForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl(''),
   fileSource: new FormControl(''),
   courseAgenda: new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required]),
   startDate: new FormControl('', [Validators.required]),
   endDate: new FormControl('', [Validators.required]),
   selectFormControlCategory: new FormControl('', [Validators.required]),
 });

  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef,
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

    this.getAllProgramsCategories();

    let programId = sessionStorage.getItem("editprogramId");
    if(programId){
      this._service.getProgramById(programId).subscribe(
        response => {
          this.program = response;
          this.imageSrc = response.banner;
          this.status = response.status;
          this.isPublished = response.isPublished;
          this.isClosed = response.isClosed;
          this.selectedCategory = response.categoryId
          this.setupForm.controls['selectFormControlCategory'].setValue(this.selectedCategory);
          this.userId = response.userId;
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

  changeCategory(value) {
    this.selectedCategory = value
    this.setupForm.controls['selectFormControlCategory'].setValue(value);
  }

  view(){
    const dialogRef = this.dialog.open(ViewImageComponent,{data : this.imageSrc});
  }

  getAllProgramsCategories(){
    let user:User = new User ();
    user.userId = sessionStorage.getItem("userId");
    user.role = sessionStorage.getItem("userRole");
    this._service.GetAllProgramsCategories(user).subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.programCategories = response as ProgramCategory[];
         }
      },
      error => {
        console.log(error)
      } 
     );
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
      courseAgenda : this.setupForm.get("courseAgenda").value,
      userId : (this.userId == null) ? sessionStorage.getItem("userId") : this.userId,
      programId: (programId) ? programId :"",
      status : this.status,
      isPublished : this.isPublished,
      isClosed:this.isClosed,
      categoryId: this.selectedCategory,
      category:  this.programCategories.find(i => i.categoryId === this.selectedCategory).category
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
