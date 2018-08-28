import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component implements OnInit {
  public debit;
  public new_balance;
  public countone;
  public counttwo;
  public countfive;
  constructor(private appService: HttpService, private _route: ActivatedRoute, private route: Router) { }

  ngOnInit() {
      this.debit = localStorage.getItem("debit");
      this.new_balance = localStorage.getItem("new_balance");
      this.countone = localStorage.getItem("100");
      this.counttwo = localStorage.getItem("2000");
      this.countfive = localStorage.getItem("500");
      let data = {
        "card_number": localStorage.getItem("card_number"),
        "debit": localStorage.getItem("debit"),
        "balance": localStorage.getItem("new_balance")
      }
      this.appService.changePin(data).subscribe((apiResponse) => {
        console.log('apiResponse', apiResponse)
        
      }, (error) => {
        console.log(error)
  
      })
  }

  public exitFun = () => {
    
      localStorage.removeItem("new_balance");
      localStorage.removeItem("100");
      localStorage.removeItem("2000");
      localStorage.removeItem("500");
      localStorage.removeItem('card_number');
      this.route.navigate(["/screen1"]);

  }
}
