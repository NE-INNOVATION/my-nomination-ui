import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';

@Component({
  selector: 'app-my-nomination-container',
  templateUrl: './my-nomination-container.component.html',
  styleUrls: ['./my-nomination-container.component.scss']
})
export class MyNominationContainerComponent implements OnInit {

  programId : string = "";
  fullImagePath = '/assets/images';
  imgVisible:boolean = false;

  constructor(private route: ActivatedRoute,private router: Router,private url:LocationStrategy,
    public dialog: MatDialog,) {
     
    console.log(this.router.url); 

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log('this.router.url', this.router.url);
          console.log(this.url.path());
          let isLoginSuccess = sessionStorage.getItem("isLoginSuccessfull");
          if((this.url.path() == "/")){
            this.imgVisible = true;
          }else{
            this.imgVisible = false;
          }
          
          if((this.router.url.indexOf('nomination') <= 0 && this.router.url.indexOf('message') <= 0) && (isLoginSuccess === "false")){
            const dialogRef = this.dialog.open(LoginComponent);
          }
         
        }
      }
    );
    
   }

  ngOnInit(): void {
  }

}
