import {Component, OnInit} from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  details: any = {};

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  fetchDetails() {
    this.dashboardService.getDetails().subscribe(
        (response: any) => {
          this.details = response;
        },
        (error) => {
          console.error('Error fetching dashboard details:', error);
        }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);  // Use the router to navigate
  }

}
