import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  title:string= "";
  content:string = "";

  ngOnInit(): void {
   this.title = sessionStorage.getItem("dialogTitle");
   this.content = sessionStorage.getItem("dialogText");
  }

  close(){
    this.dialog.closeAll();
  }

}
