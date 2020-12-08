import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MessageData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-message-as',
  templateUrl: './message-as.component.html',
  styleUrls: ['./message-as.component.css']
})
export class MessageAsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageAsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}