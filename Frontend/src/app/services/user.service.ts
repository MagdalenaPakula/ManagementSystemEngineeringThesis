import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http:HttpClient) { }

  signUp(userData: any) {
    const url = `${this.baseUrl}/signup`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, userData, { headers });
  }

  login(loginData: any) {
    const url = `${this.baseUrl}/login`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, loginData, { headers });
  }
}
