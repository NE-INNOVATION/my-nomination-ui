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

  constructor(private route: ActivatedRoute,private router: Router,
    public dialog: MatDialog,) {
     
    console.log(this.router.url); 

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log('this.router.url', this.router.url);
          let isLoginSuccess = sessionStorage.getItem("isLoginSuccessfull");
          
          if(this.router.url.indexOf('nomination') <= 0 && !isLoginSuccess){
            const dialogRef = this.dialog.open(LoginComponent);
          }
         
        }
      }
    );
    
   }

  ngOnInit(): void {
  }

}
