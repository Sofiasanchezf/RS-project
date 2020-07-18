import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user.model';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

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

  openRemoveDoctorsDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Delete all doctors', body: 'Are you sure you want to delete all doctors?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('eliminando post...', result);
      if (result) {

        const doctors: User[] = this.userService.getUsers().filter(
          (user: User) => user.professional.professionalType === 'Doctor'
        );
        
        for (let doctor of doctors) {
          this.userService.deleteUser(doctor.id).subscribe(() => {
            this.userService.getAllUsers();
          });
        }
        
      }
    });
  }

  openRemoveDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Delete user ' + id, body: 'Are you sure you want to delete this user?' }
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
