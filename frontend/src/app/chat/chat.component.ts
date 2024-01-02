import { Component } from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  message = '';
  chatHistory: string[] = [];
  isChatVisible = false;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.message.trim() === '') {
      return;
    }

    this.chatHistory.push(`You: ${this.message}`);
    this.chatService.sendMessage(this.message).subscribe((response) => {
      this.chatHistory.push(`Bot: ${response.answer}`);
    });

    this.message = '';
  }

}
