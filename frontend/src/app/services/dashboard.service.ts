import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getDetails(){
    return this.http.get(this.baseUrl+"/dashboard/details");
  }
}
