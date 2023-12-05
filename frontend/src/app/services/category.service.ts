import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }

  addCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, categoryData);
  }

  updateCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, categoryData);
  }

}
