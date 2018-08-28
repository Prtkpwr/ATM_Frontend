import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component implements OnInit {

  constructor(private appService: HttpService, private _route: ActivatedRoute, private route: Router) { }

  
  private pin;
  public amount;

  ngOnInit() {
  }

  // Change PIN
  public changePin: any = () => {
    let data = {
      card_number: localStorage.getItem('card_number'),
      pin: this.pin
    }
    if(data.pin && data.card_number){
      this.appService.changePin(data).subscribe((apiResponse) => {
        console.log('apiResponse', apiResponse)
        if(apiResponse.status === 200){
          localStorage.removeItem('card_number');
        this.route.navigate(["/screen1"]);

        }
        else if (apiResponse.status === 404){
          alert(apiResponse.message);
          this.pin= '';
        }
        else if (apiResponse.status === 500){
          alert(apiResponse.message);
          this.pin= '';
        }
      }, (error) => {
        console.log(error)
  
      })
    }
  } // Change PIN End

  // Withdraw Money
  public withdrawMoney:any = () => {
    let data = {
      "card_number": localStorage.getItem('card_number'),
      "amount":this.amount
    }
    console.log("data",data)
    this.appService.withdraw(data).subscribe((apiResponse) => {
      console.log('apiResponse', apiResponse)
      // if(apiResponse.status === 200){
      // this.route.navigate(["/screen3"]);
      // }
      // else if (apiResponse.status === 404){
      //   alert(apiResponse.message);
      //   this.pin= '';
      // }
      // else if (apiResponse.status === 500){
      //   alert(apiResponse.message);
      //   this.pin= '';
      // }
    }, (error) => {
      console.log(error)

    })
  }

}