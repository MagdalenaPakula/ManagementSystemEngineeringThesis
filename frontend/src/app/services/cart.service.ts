import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  generateReport(data: any) {
    const url = `${this.baseUrl}/generateReport`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, data, { headers });
  }

  getPdf(data: any): Observable<Blob> {
    return this.http.post(this.baseUrl+"/getPdf", data, { responseType: 'blob'});
  }

  getBills() {
    return this.http.get(`${this.baseUrl}/getBills`);
  }

  delete(id: any): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }
}
