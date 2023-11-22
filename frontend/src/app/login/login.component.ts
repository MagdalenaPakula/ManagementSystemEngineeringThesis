import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialogService: DialogService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const loginData = this.loginForm.value;

    this.userService.login(loginData).subscribe(
        (response) => {
          console.log('Successfully logged in:', response);
          this.dialogService.openDialog('Login Status', 'Successfully logged in');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error logging in:', error);
          this.dialogService.openDialog('Login Status', 'Login failed, try again :)');
        }
    );
  }

}
