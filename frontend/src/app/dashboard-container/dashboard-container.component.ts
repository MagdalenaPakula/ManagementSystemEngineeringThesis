import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent implements OnInit{
  details: any = {};
  showDashboardContainer: boolean = false;

  constructor(private dashboardService: DashboardService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is /dashboard or a child route
        this.showDashboardContainer = event.url === '/dashboard' || event.url.startsWith('/dashboard/');
      }
    });
  }

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
