import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { ProgramService } from 'src/app/core/program.service';
import { ObervableService } from 'src/app/core/obeservable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog,private _service: ProgramService,
   private _observableService : ObervableService,
   private router: Router) { }

  errorLabel : string = "";

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
     
      var user:User = {
        password : this.form.get("password").value,
        userId : this.form.get("username").value,
        role : null,
        categoryId:[]
      }

     this._service.login(user).subscribe(
      response => {
        if(response !=null && response.role){
          sessionStorage.setItem("userId",response.userId);
          sessionStorage.setItem("userRole",response.role)
          sessionStorage.setItem("isLoginSuccessfull","true");
          this.dialog.closeAll();
          this.submitEM.emit(response.role);
          this._observableService.setUser(response);
          this.router.navigate(['/view'])
         }else{
           this.errorLabel = "Please enter valid Username or Password";
           sessionStorage.setItem("isLoginSuccessfull","false");
         }
      },
      error => console.log(error)
     );
      
    }
  }

  close(){
    this.dialog.closeAll();
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
