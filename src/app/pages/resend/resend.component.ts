import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResendService } from './resend.service';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {

  isError: boolean = false;
  isSuccess: boolean = false;
  messages: string[] = [];
  email: string = '';

  constructor(private router: Router, private spinner: NgxSpinnerService, private resendService: ResendService) { }

  ngOnInit(): void {
    this.isError = false;
    this.isSuccess = false;
    this.email = '';
    this.messages = [];
  }

  goToLogin(){
    this.router.navigate(['login'])
  }


  goToRegister(){
    this.router.navigate(['register'])
  }


  onResendClick(){
    this.isError = false;
    this.isSuccess = false;
    this.spinner.show();

    let data = {
      "email" : this.email,
    }
    
    this.resendService.resendEmail(data).subscribe((result) => {
      this.spinner.hide();
      this.isSuccess = true;
      this.messages[0] = "Please check your email to activate your account"
    },(error)=>{
      this.spinner.hide();
      this.isError = true;
      this.isSuccess = false;
      this.messages = error.messages;
    });
  }

}
