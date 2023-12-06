import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //connection to backend
  private baseUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  addNewProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }

  updateProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/{id}`, id);
  }

  updateStatus(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateStatus`, data);
  }

  getProductByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProductByCategory/${categoryId}`);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProductById/${productId}`);
  }

}
