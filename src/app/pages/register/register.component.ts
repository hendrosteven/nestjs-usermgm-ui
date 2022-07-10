import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messages: String[] = [];
  isError: boolean = false;
  isSuccess: boolean = false;

  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private spinner: NgxSpinnerService, private service: RegisterService) { 
    
  }

  ngOnInit(): void {
    this.messages = [];
    this.isError = false;
    this.isSuccess = false;
    this.resetForm();
  }

  resetForm(){
    this.fullName = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }

  goToLogin(){
    this.router.navigate(['login']);
  }


  onRegisterClick(){
    this.isError = false;
    this.isSuccess = false;
    this.spinner.show();

    let data = {
      "email" : this.email,
      "password" : this.password,
      "passwordConfirm" : this.confirmPassword,
      "fullName" : this.fullName
    }

    this.service.register(data).subscribe((result) => {
      this.spinner.hide();
      this.resetForm();
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
