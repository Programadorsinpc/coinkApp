import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.bancoink.biz/qa/signup';
  private apiKey = '030106';

  constructor(private http: HttpClient) {}

  getDocumentTypes() {
    return this.http.get(`${this.apiUrl}/documentTypes?apiKey=${this.apiKey}`);
  }

  getGenders() {
    return this.http.get(`${this.apiUrl}/genders?apiKey=${this.apiKey}`);
  }
}
