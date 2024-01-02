import {Component, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { DialogService } from "../services/dialog.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private dialogService: DialogService,
        private dialog: MatDialog,
        private authService: AuthService
    ) {
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
                console.log('Token:', token);

                this.authService.setToken(token);

                const userRole = this.authService.getRole();

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

    handleForgotPasswordAction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "600px";
        this.dialog.open(ForgotPasswordComponent, dialogConfig);
    }

  // Method to handle "Enter" key press event
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.login();
  }
}
