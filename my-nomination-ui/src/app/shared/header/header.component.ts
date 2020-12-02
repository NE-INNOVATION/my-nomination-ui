import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  @ViewChild("toggleElement") ref: any;
  checked : boolean = false;
  slideLabel:string = "Log In";
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  toggle(event: MatSlideToggleChange) {
    console.log('Toggle fired');
    if( event.checked){
      this.slideLabel = "Log out";
      this.openDialog();
    }else{
      this.slideLabel = "Log in";
      sessionStorage.setItem("userId","");
      sessionStorage.setItem("userRole","")
      sessionStorage.setItem("isLoginSuccessfull","false");
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));

      if(isSuccefull){
        this.ref._checked = true;
        this.slideLabel = "Log out";
      }else{
        this.ref._checked = false;
        this.slideLabel = "Log in";
      }
    });
  }

}
