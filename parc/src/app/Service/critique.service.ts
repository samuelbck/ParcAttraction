import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CritiqueInterface } from '../Interface/critique.interface';

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {

  private apiUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  getCritiques(): Observable<CritiqueInterface[]> {
    return this.http.get<CritiqueInterface[]>(`${this.apiUrl}critiques`);
  }

  addCritique(critique: CritiqueInterface): Observable<CritiqueInterface> {
    return this.http.post<CritiqueInterface>(`${this.apiUrl}critiques`, critique);
  }
}