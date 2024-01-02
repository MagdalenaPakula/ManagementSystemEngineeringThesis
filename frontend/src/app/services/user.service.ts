import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http:HttpClient, private authService: AuthService) { }

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

    // Make the login request
    return this.http.post(url, loginData, { headers }).pipe(
      // Handle the response and set the token in AuthService
      map((response: any) => {
        if (response.token) {
          this.authService.setToken(response.token);
        }
        return response;
      })
    );
  }

  forgotPassword(data:any){
    const url = `${this.baseUrl}/forgotPassword`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, { headers });
  }

  checkToken() {
    return this.http.get(this.baseUrl+"/checkToken");
  }

  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}/get`;
    console.log('Request URL:', url);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get(`${this.baseUrl}/get`, { headers });

  }

  updateUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/${id}`, null);
  }

  changePassword(data:any){
    const url = `${this.baseUrl}/changePassword`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, { headers });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${userId}`);
  }
}
