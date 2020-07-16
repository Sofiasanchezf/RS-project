import { Component, OnInit, Inject } from '@angular/core';

import { UserListComponent } from 'src/app/containers/user-list/user-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, body: string }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}


