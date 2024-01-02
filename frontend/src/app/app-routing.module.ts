import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";
import {ManageProductComponent} from "./manage-product/manage-product.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {ManageOrderComponent} from "./manage-order/manage-order.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to /home
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: MyAccountComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardContainerComponent },
      { path: 'category', component: ManageCategoryComponent },
      { path: 'product', component: ManageProductComponent },
      { path: 'user', component: ManageUserComponent},
      { path: 'cart', component: ManageOrderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
