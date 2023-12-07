import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    this.updateLoggedInStatus(); // Check initial login status
  }

  private updateLoggedInStatus(): void {
    const token = this.getToken();
    this.isLoggedIn = !this.jwtHelper.isTokenExpired(token);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.updateLoggedInStatus(); // Update login status when token is set
  }

  public getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.updateLoggedInStatus(); // Update login status when user logs out
    // Log a message to the console
    console.log('User logged out successfully.');
    this.router.navigate(['/']); // Update this to the actual home page route
  }


}
