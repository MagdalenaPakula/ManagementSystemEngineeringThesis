import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DietGeneratorService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  submitForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, data);
  }
}
