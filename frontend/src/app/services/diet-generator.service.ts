import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DietGeneratorService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  generateDiet(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, data);
  }

}
