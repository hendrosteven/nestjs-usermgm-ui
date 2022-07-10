import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullName: string = '';
  email: string = '';


  constructor(private router: Router,private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getProfile().subscribe((result)=>{
      this.fullName = result['fullName'];
      this.email = result['email'];
    })
  }

  goToEditName(){
    this.router.navigate(['edit-name']);
  }

  goToChangePassword(){
    this.router.navigate(['change-password']);
  }

}
