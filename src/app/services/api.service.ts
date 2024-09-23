import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.bancoink.biz/qa/signup';
  private apiKey = '030106';
  private http = inject(HttpClient)

  getDocumentTypes(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}/documentTypes?apiKey=${this.apiKey}`)
      .pipe(
        catchError(this.handleError)  
      );
  }

  getGenders(): Observable<ApiResponse> { 
    return this.http
      .get<ApiResponse>(`${this.apiUrl}/genders?apiKey=${this.apiKey}`)
      .pipe(
        catchError(this.handleError)  
      );
  }

  private handleError(error: any) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error en la API')); 
  }
}
