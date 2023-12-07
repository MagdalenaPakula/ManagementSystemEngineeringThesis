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
    const newName = prompt('Enter the new username:', user.name);
    const newSurname = prompt('Enter the new surname:', user.surname);
    const newEmail = prompt('Enter the new email:', user.email);
    const newPassword = prompt('Enter the new password:', user.password);
    const newStatus = prompt('Enter the new status:', user.status);
    const newRole = prompt('Enter the new role:', user.role);

    if (newName && newSurname && newEmail && newPassword && newStatus && newRole) {
      // Create an object with the updated values
      const updatedUser = {
        ...user,
        name: newName,
        surname: newSurname,
        email: newEmail,
        password: newPassword,
        status: newStatus,
        role: newRole
      };

      this.userService.updateUser(updatedUser).subscribe(
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
