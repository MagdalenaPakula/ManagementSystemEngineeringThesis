// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { DialogService } from "../services/dialog.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialogService: DialogService, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const loginData = this.loginForm.value;

    this.userService.login(loginData).subscribe(
        (response: any) => {
          console.log('Successfully logged in:', response);
          this.dialogService.openDialog('Login Status', 'Successfully logged in');

          const token = response.token;

          // decode the token to get user role
          const decodedToken = this.decodeToken(token);
          const userRole = decodedToken.role;

          if (userRole === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (userRole === 'user') {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Error logging in:', error);
          this.dialogService.openDialog('Login Status', 'Login failed, try again');
        }
    );
  }

  decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  handleForgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
}
