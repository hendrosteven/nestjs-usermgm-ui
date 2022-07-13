import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './login.service';
import { BASE_URL } from 'src/app/utils/app-const';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string = '';
  password: string = '';
  isError: boolean = false;
  messages: string[] = [];
  googleLoginURL = BASE_URL + '/auth/google';
  socialUser!: SocialUser;

  constructor(private router: Router, private spinner: NgxSpinnerService, private loginService: LoginService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.isError = false;
        this.messages = [];
        this.spinner.show();
        this.socialUser = user;
        this.loginService.socialLogin(this.socialUser.email, this.socialUser.name, this.socialUser.provider).subscribe((result) => {
          this.spinner.hide();
          this.loginService.saveAccessToken(result);
          this.router.navigate([''])
        }, (error) => {
          this.spinner.hide();
          this.isError = true;
          this.messages = error.messages;
        });
      }
    },(error)=>{
      console.log(error);
    });
  }

  onLoginClick() {
    this.isError = false;
    this.messages = [];
    this.spinner.show();
    this.loginService.login(this.email, this.password).subscribe((result) => {
      this.loginService.saveAccessToken(result);
      this.email = '';
      this.password = '';
      this.router.navigate([''])
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.isError = true;
      this.messages = error.messages;
    });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToReset() {
    this.router.navigate(['reset']);
  }

  goToResend() {
    this.router.navigate(['resend']);
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
