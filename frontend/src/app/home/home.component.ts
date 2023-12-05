import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private dialog:MatDialog,
              private userService:UserService,
              private router:Router) {
  }

  ngOnInit() {
    this.userService.checkToken().subscribe((response:any)=>{
      this.router.navigate(['dashboard']);
    },(error:any)=>{
      console.log(error);
    })
  }

}
