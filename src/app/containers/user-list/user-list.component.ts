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
      width: '250px',
      data: { title: 'Eliminar todos los doctores', body: '¿Estás seguro de eliminar todos los doctores?' }
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
