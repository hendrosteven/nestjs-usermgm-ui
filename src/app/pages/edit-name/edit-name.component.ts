import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { EditNameService } from './edit-name.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit {

  fullName: string = '';

  constructor(private spinner: NgxSpinnerService, private router: Router, private editNameService: EditNameService, private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getProfile().subscribe((result) =>{
      this.fullName = result['fullName']
    })
  }


  updateName(){
    this.spinner.show()
    this.editNameService.updateName(this.fullName).subscribe((result)=>{
      this.spinner.hide();
      this.router.navigate(['home']);
    },(error)=>{
      this.spinner.hide();
    })
  }

}
