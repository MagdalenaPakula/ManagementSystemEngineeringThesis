import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error loading users (loadUsers)', error);
      }
    );
  }

  updateUser(user: any) {
    user.name = prompt('Enter the new username:', user.name);
    user.email = prompt('Enter the new email:', user.email);
    if (user.username && user.email) {
      this.userService.updateUser(user).subscribe(
        (data: any) => {
          console.log('User updated successfully', data);
          this.loadUsers(); // Refresh the user list
        },
        (error: any) => {
          console.error('Error updating user', error);
        }
      );
    }
  }


}
