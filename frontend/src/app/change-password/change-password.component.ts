import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SnackbarService} from "../services/snackbar.service";
import {GlobalConstants} from "../global-constants";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private ngxService: NgxUiLoaderService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  validateSubmit() {
    return this.changePasswordForm.valid && this.changePasswordForm.get('newPassword').value === this.changePasswordForm.get('confirmPassword').value;
  }

  handlePasswordChangeSubmit() {
    if (!this.validateSubmit()) {
      const errorMessage = 'Password and Confirm password do not match - cannot change';
      console.error(errorMessage);
      this.snackbarService.openSnackBar(errorMessage, GlobalConstants.errorek);
      return;
    }

    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage, "");
    }, (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.errorek;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.errorek);
    })
  }

}
