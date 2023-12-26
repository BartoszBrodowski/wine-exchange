import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateUser`, user);
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserById/${id}`);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/allUsers`);
  }
}