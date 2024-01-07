import {Component, HostListener} from '@angular/core';
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {DialogService} from "../services/dialog.service";
import {GlobalConstants} from "../global-constants";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialogService: DialogService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      surname: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      contactNumber: ['', [Validators.pattern(GlobalConstants.numberRegex)]],
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

  // Method to handle "Enter" key press event
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.signUp();
  }

}
