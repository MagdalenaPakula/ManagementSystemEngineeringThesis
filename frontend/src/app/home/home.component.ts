import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userInput: string = '';
  chatHistory: any[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.userService.checkToken().subscribe(
      (response: any) => {
        this.router.navigate(['dashboard']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  sendMessage() {
    this.chatService.sendMessage(this.userInput).subscribe((response) => {
      this.chatHistory.push({ user: this.userInput, bot: response.answer });
      this.userInput = ''; // Clear the input field
    });
  }

  chatboxActive: boolean = false;

  toggleChatbox() {
    this.chatboxActive = !this.chatboxActive;
  }


}
