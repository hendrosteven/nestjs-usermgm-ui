import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { VerifyService } from './verify.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  messages: string = 'We can`t verify your account! You can create a new account or login if you already have an active account';
  isError: boolean = false;

  constructor(private verifyService: VerifyService, private router: Router, private spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isError = false;
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe(params => {
      this.verifyService.verifyUser(params['id']).subscribe((result)=>{
        this.loginService.saveAccessToken(result);        
        this.router.navigate([''])
        this.spinner.hide();
      },(error)=>{
        this.spinner.hide();
        this.isError = true
        //this.router.navigate(['login'])
      })
    });
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

  goToRegister(){
    this.router.navigate(['register'])
  }

}
