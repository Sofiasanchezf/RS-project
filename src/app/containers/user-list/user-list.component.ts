import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user.model';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAllUsers();
  }

  getUsers(): User[] {
    return this.userService.getUsers();
  }

  openRemoveDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Eliminar usuario ' + id, body: '¿Estás seguro de eliminar el usuario?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('eliminando post...', result);
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.getAllUsers();
        });
      }
    });
  }
}
