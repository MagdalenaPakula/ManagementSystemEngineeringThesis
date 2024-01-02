import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "./dialog.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router,
      private dialog: MatDialog,
      private dialogService: DialogService
  ) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean | UrlTree {
    const userRole = this.authService.getRole();

    if (userRole === 'admin') {
      return true; // Admin can access any route
    } else if (userRole === 'user') {
      // Redirect users to home page if they try to access the dashboard
      if (next.routeConfig?.path === 'dashboard') {
        // this.dialogService.openDialog('Login Status', 'You do not have permission to access the dashboard');
        console.log('Unauthorized attempt to access the dashboard.');
        return false;
      }
      return true; // User can access other routes
    }
    return false;
  }
}
