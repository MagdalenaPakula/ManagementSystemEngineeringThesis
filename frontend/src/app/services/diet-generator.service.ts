import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DietGeneratorService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  submitForm(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const params = new HttpParams()
        .set('age', data.age)
        .set('weight', data.weight)
        .set('height', data.height)
        .set('gender', data.gender)
        .set('activity_level', data.activity_level)
        .set('goal', data.goal)
        .set('num_meals', data.num_meals);

    return this.http.post(`${this.apiUrl}/submit`, params.toString(), { headers });
  }
}
