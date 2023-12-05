import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
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
    // Log a message to the console
    console.log('User logged out successfully.');
  }
}
