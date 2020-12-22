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
      
    route.params.subscribe(
      (params) => {
       let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
        
        if(!isSuccefull){
          const dialogRef = this.dialog.open(LoginComponent);
        }
      });

   }

  ngOnInit(): void {
  }

}
