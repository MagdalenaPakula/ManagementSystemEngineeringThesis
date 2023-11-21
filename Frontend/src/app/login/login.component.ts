import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
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

          // You can navigate to the home page or perform other actions here
        },
        (error) => {
          console.error('Error logging in:', error);
        }
    );
  }

}
