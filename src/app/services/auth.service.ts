import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080';

  private constructor(private http: HttpClient) {}

  public register(userDetails: User): Observable<object> {
    return this.http.post(`${this.baseUrl}/api/auth/register`, userDetails);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users?email=${email}`);
  }
}
