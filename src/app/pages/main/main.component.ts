import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  currentDateTime = null;

  constructor(private router: Router, private loginService: LoginService) {

    setInterval(() => {
      this.currentDateTime = Date.now();
    }, 1000);

  }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  onLogoutClick() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  goToEditName(){
    this.router.navigate(['edit-name']);
  }

  goToChangePassword(){
    this.router.navigate(['change-password']);
  }

}
