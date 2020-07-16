import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Observable, forkJoin } from 'rxjs';
import { NgForm } from '@angular/forms';

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

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + 'users/' + id);
  }

  insertUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'users', user);
  }

  deleteUser(id: number): Observable<object> {
    return this.httpClient.delete<object>(this.API_URL + 'users/' + id);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_URL + 'users/' + user.id, user);
  }

}
