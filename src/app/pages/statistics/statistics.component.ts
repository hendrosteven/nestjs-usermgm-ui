import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatisticService } from './statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  users: any[] = [];
  statistic: any;

  constructor(private spinner: NgxSpinnerService, private statisticService: StatisticService ) { }

  ngOnInit(): void {
    this.findAllUser();
    this.findStatistic();
  }

  findAllUser(){
    this.spinner.show();
    this.statisticService.findAllUser().subscribe((results) => {
      this.users = results;
      this.spinner.hide();
    })
  }

  findStatistic(){
    this.spinner.show()
    this.statisticService.findStatistic().subscribe((result) =>{
      console.log(result);
      this.statistic = result;
      this.spinner.hide();
    })
  }

}
