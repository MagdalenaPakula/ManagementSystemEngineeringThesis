import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthorizationService } from "./authorization.service";
import { SnackbarService } from "./snackbar.service";
import { GlobalConstants } from "../global-constants";

// Importing like this to avoid the "does not provide an export named 'default'" error
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  constructor(public auth: AuthorizationService,
              public router: Router,
              private snackbarService: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray['expectedRole'];

    const token: any = localStorage.getItem('token');

    let tokenPayload: any;
    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }



    let expectedRole = '';

    for (let i = 0; i < expectedRoleArray['length']; i++) {
      if (expectedRoleArray[i] === tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && tokenPayload.role === expectedRole) {
        return true;
      }
      this.snackbarService.openSnackBar(GlobalConstants.unAuthorized, GlobalConstants.errorek);
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
