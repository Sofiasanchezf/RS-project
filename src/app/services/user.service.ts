import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3000/';
  private users: User[];

  constructor(private httpClient: HttpClient) { }

  getAllUsers():void {
    this.httpClient.get<User[]>(this.API_URL + 'users').subscribe(users => this.users = users);
    
  }

  getUsers(): User[] {
    return this.users;
  }

}
