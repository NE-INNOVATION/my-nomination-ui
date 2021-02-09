import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ObervableService } from 'src/app/core/obeservable.service';
import { Router, RouterLink } from '@angular/router';
import { NominationService } from 'src/app/core/nomination.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
 
  @ViewChild("toggleElement") ref: any;
  checked : boolean = false;
  slideLabel:string = "Log In";
  isViewVisbile : boolean = false;
  isSetupVisbile : boolean = false;
  isBackupVisbile : boolean = false;

  constructor(public dialog: MatDialog,
     private _observableService : ObervableService,
     private _service: NominationService,
     private router: Router
     ) {
   
    this._observableService.doLogin.subscribe(data =>
      {
        
         if((this.router.url.indexOf('nomination') <= 0 && this.router.url.indexOf('message') <= 0 && this.router.url.indexOf('courses') <= 0) && (data.role === null)){
          const dialogRef = this.dialog.open(LoginComponent);
        }

        if(!data.role){
          return;
        }

        this.isViewVisbile = (data.role.toLowerCase() == "admin" || data.role.toLowerCase() == "superadmin" || data.role.toLowerCase() == "view") ;
        this.isSetupVisbile = (data.role.toLowerCase() == "admin" || data.role.toLowerCase() == "superadmin");
        this.isBackupVisbile = (data.role.toLowerCase() == "superadmin");
        this.checked = true;
        this.slideLabel = "Log out";
      });

   }

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
      this.isSetupVisbile = false;
      this.isBackupVisbile = false;
      this.isViewVisbile = false;
      this.router.navigate([''])
      this.openDialog();
    }
  }

  openView(){
    this.router.navigate(['/view'])
  }

  backUp(){

    let todaysDate = new Date();

    this._service.getAllNominations().subscribe(
      response => {
        if(response !=null){
          this.dyanmicDownloadByHtmlTag({
            fileName: 'MyNominations' + todaysDate.getDate() + todaysDate.getMonth() + + todaysDate.getFullYear(),
            text: JSON.stringify(response)
          });
         }
      },
      error => {
        console.log(error)
      } 
     );

     this._service.getAllPrograms().subscribe(
      response => {
        if(response !=null){
          this.dyanmicDownloadByHtmlTag({
            fileName: 'MyPrograms'  + todaysDate.getDate() + todaysDate.getMonth() + + todaysDate.getFullYear(),
            text: JSON.stringify(response)
          });
         }
      },
      error => {
        console.log(error)
      } 
     );
    
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  openSetup(){
    this.router.navigate(['/viewsetup'])
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
        this.isSetupVisbile = false;
        this.isViewVisbile = false;
        this.isBackupVisbile = false;
      }
    });
  }

  ngOnDestroy() {
    
  }

}
