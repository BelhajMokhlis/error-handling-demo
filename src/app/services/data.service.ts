import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

interface CatFact {
  fact: string;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://catfact.ninja/fact';
//   private apiUrl = 'http://localhost:8080/api/users/chanson';

  constructor(private http: HttpClient) {}

  getData(): Observable<{title: string, content: string}> {
    return this.http.get<CatFact>(this.apiUrl).pipe(
      map(response => ({
        title: 'Cat Fact',
        content: response.fact
      })),
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
} 