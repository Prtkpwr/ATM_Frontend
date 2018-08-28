import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from '../services/http.service';
import swal from 'sweetalert';


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
    if (data.pin && data.card_number) {
      this.appService.changePin(data).subscribe((apiResponse) => {
        console.log('apiResponse', apiResponse)
        if (apiResponse.status === 200) {
          localStorage.removeItem('card_number');
          this.route.navigate(["/screen1"]);

        }
        else if (apiResponse.status === 400) {
          swal(apiResponse.message);
          this.pin = '';
        }
        else if (apiResponse.status === 500) {
          swal(apiResponse.message);
          this.pin = '';
        }
      }, (error) => {
        console.log(error)

      })
    }
  } // Change PIN End

  // Withdraw Money
  public withdrawMoney: any = () => {
    let data = {
      "card_number": localStorage.getItem('card_number'),
      "amount": this.amount
    }
    this.appService.withdraw(data).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        localStorage.setItem("new_balance", apiResponse.data.new_balance)
        localStorage.setItem("2000", apiResponse.data.counttwo)
        localStorage.setItem("500", apiResponse.data.countfive)
        localStorage.setItem("100", apiResponse.data.countone)
        localStorage.setItem("debit", this.amount)
        this.route.navigate(["/screen3"]);
      }
      else if (apiResponse.status === 400) {
        swal("Alert", apiResponse.message, "info");
        this.amount = '';
      }
    }, (error) => {
      console.log(error)

    })
  }

  // Change PIN
  public balanceCheck: any = () => {
    let data = {
      card_number: localStorage.getItem('card_number')
    }
    if (data.card_number) {
      this.appService.checkBal(data).subscribe((apiResponse) => {
        console.log('apiResponse', apiResponse)
        if (apiResponse.status === 200) {
          swal("Account Balance INR", (apiResponse.data[0].balance).toString(), "success")

        }
        else if (apiResponse.status === 400) {
          swal("Alert", apiResponse.message, "info");
          this.pin = '';
        }
        else if (apiResponse.status === 500) {
          swal("Alert", apiResponse.message, "info");
          this.pin = '';
        }
      }, (error) => {
        console.log(error)

      })
    }
  } // Change PIN End

  public cancelEverything: any = () => {
    localStorage.removeItem('card_number')
    this.route.navigate(["/screen1"]);
  }

}
