import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialogService: DialogService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.pattern('^[0-9]{10,10}$')]],
    });
  }

  signUp() {
    if (this.signupForm.invalid || this.signupForm.get('password')!.value !== this.signupForm.get('confirmPassword')!.value) {
      console.error('Invalid form or password and confirm password do not match');
      return;
    }

    const userData = this.signupForm.value;

    this.userService.signUp(userData).subscribe(
        (response) => {
          console.log('Successfully signed up:', response);
          this.dialogService.openDialog('Registration Status', 'Successfully signed up');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error signing up:', error);
          this.dialogService.openDialog('Registration Status', 'Sign up failed');
        }
    );
  }
}
