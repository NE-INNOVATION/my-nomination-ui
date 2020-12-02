import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { NominationService } from 'src/app/core/nomination.service';
import { map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog,private _service: NominationService) { }

  errorLabel : string = "";

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      var user:User = {
        password : this.form.get("password").value,
        userId : this.form.get("username").value,
        role : null
      }

     this._service.login(user).subscribe(
      response => {
        if(response !=null && response.role){
          sessionStorage.setItem("userId",response.userId);
          sessionStorage.setItem("userRole",response.role)
          sessionStorage.setItem("isLoginSuccessfull","true");
          this.dialog.closeAll();
         }else{
           this.errorLabel = "Please enter valid Username or Password";
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
