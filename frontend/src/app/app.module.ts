import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from "./signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from "ngx-ui-loader";
import {MatInputModule} from "@angular/material/input";
import { JwtModule } from '@auth0/angular-jwt';
import {TokenInterceptorInterceptor} from "./services/token-interceptor.interceptor";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text:"Loading..",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#ff8c21",
  fgsType:SPINNER.squareJellyBox,
  fgsSize:100,
  hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    DialogComponent,
    DashboardComponent,
    ProductComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogClose,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatDialogContent,
    MatInputModule,
    MatDialogActions,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
      {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
