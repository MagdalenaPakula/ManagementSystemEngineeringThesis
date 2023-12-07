import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    // Call the logout method from your AuthService or do any other cleanup
    this.authService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
