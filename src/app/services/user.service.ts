import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3000/';
  private users: User[];

  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all users
   */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.API_URL + 'users').subscribe(users => {
      this.users = users;
    });
  }

  /**
   * Gets the users of this class
   */
  getUsers(): User[] {
    return this.users;
  }

  /**
   * Gets the user with the id given
   * @param id 
   */
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + 'users/' + id);
  }

  /**
   * Delete a user with the id given
   * @param id 
   */
  deleteUser(id: string): Observable<object> {
    return this.httpClient.delete<object>(this.API_URL + 'users/' + id);
  }

  /**
   * Inser a new user to the list of users
   * @param user 
   */
  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'users', user);
  }

  /**
   * Update a user with new information
   * @param user 
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_URL + 'users/' + user._id, user);
  }

}
