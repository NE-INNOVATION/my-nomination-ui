import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../core/models/user.model';
import { ProgramService } from '../core/program.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users : User[] = [];
  displayedColumns: string[] = ['userId', 'role','edit'];
  dataSource = new MatTableDataSource<User>(this.users);
  checked : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private _service: ProgramService,private router: Router) {

   }

  ngOnInit(): void {
    let isSuccefull = JSON.parse(sessionStorage.getItem("isLoginSuccessfull"));
   
        
    if(!isSuccefull){
      this.router.navigate([''])
      return;
    }

    this._service.getAllUsers().subscribe(
      response => {
        if(response !=null && response.length > 0){
          this.users = response as User[];
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
         }
      },
      error => {
        console.log(error)
      } 
     );
  }

  editUser(userId : string){

  }

  addUser(){

  }

}
