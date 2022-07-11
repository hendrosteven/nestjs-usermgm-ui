import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  email: string = '';
  password: string = '';
  isError: boolean = false;
  messages : string[] = [];

  constructor(private router: Router, private spinner: NgxSpinnerService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  onLoginClick(){
    this.isError = false;
    this.messages = [];
    this.spinner.show();
    this.loginService.login(this.email, this.password).subscribe((result) => {
      this.loginService.saveAccessToken(result);
      this.email = '';
      this.password = '';
      this.router.navigate([''])
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
      this.isError = true;
      this.messages = error.messages;
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

  goToReset(){
    this.router.navigate(['reset']);
  }

  goToResend(){
    this.router.navigate(['resend']);
  }


}
