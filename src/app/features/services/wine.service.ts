import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from '../../shared/interfaces/wine.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private baseUrl: string = 'http://localhost:8080/wines';

  public constructor(private http: HttpClient) { }

  public getAllWines(): Observable<Wine[]> {
    const url: string = `${this.baseUrl}/getAllWines`;
    
    return this.http.get<Wine[]>(url);
  }

  public getWineById(id: string): Observable<Wine> {
    const url: string = `${this.baseUrl}/getWineById/${id}`;
    
    return this.http.get<Wine>(url);
  }

  public deleteWine(id: string): Observable<string> {
    const url: string = `${this.baseUrl}/deleteWine/${id}`;
    
    return this.http.delete<string>(url);
  }
}
