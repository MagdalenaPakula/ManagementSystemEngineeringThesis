import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  logout() {
    // Call the logout method from your AuthService or do any other cleanup
    this.authService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  handleChangePasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
