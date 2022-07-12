import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth-guard';
import { EditNameComponent } from './pages/edit-name/edit-name.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ResendComponent } from './pages/resend/resend.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const AppRoutes: any = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "edit-name", component: EditNameComponent },
      { path: "change-password", component: ChangePasswordComponent},
      { path: "statistics", component: StatisticsComponent}
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "verify",
    component: VerifyComponent
  },
  {
    path: "resend",
    component: ResendComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditNameComponent,
    ChangePasswordComponent,
    VerifyComponent,
    ResendComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
