import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from '../interfaces/wine.interface';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  private baseUrl: string = 'http://localhost:8080/wines'

  constructor(private http: HttpClient) { }

  public getAllWines() {
    const url: string = `${this.baseUrl}/getAllWines`
    return this.http.get<Wine[]>(url)
  }
}
