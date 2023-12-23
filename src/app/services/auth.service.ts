import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080';

  private constructor(private http: HttpClient) {}

  public register(userDetails: User): Observable<HttpResponse<User | string>> {
    return this.http.post<User | string>(`${this.baseUrl}/users/addUser`, userDetails, { observe: 'response' });
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users?email=${email}`);
  }
}
