import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog) { }

  imageSrc:any;
 
  ngOnInit(): void {
    if(!this.data || this.data === ""){
        return;
    }
    this.imageSrc = this.data;
    console.log(this.data)
  }

}
