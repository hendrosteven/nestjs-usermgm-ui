import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  messages: String[] = [];
  isError: boolean = false;
  isSuccess: boolean = false;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private spinner: NgxSpinnerService, private router: Router, private changePasswordService: ChangePasswordService) { }

  ngOnInit(): void {
    this.messages = [];
    this.isError = false;
    this.isSuccess = false;
    this.resetForm()
  }

  resetForm(){
    this.currentPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
  }

  changePassword(){
    this.isError = false;
    this.isSuccess = false;
    this.spinner.show();

    this.changePasswordService.changePassword(this.currentPassword, this.newPassword, this.confirmPassword).subscribe((result) =>{
      this.spinner.hide();
      this.resetForm();
      this.isSuccess = true;
      this.messages[0] = "Password updated, please relogin!"
    },(error) => {
      this.spinner.hide();
      this.isError = true;
      this.isSuccess = false;
      this.messages = error.messages;
    });
  }

}
