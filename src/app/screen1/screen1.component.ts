import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {

  constructor(private appService: HttpService, private _route: ActivatedRoute, private route: Router) { }

  //declaring variables
  public card_number;
  private pin;
  private data;
  
  ngOnInit() {
  }

  public validateCard: any = () => {
    this.data = {
      card_number: this.card_number,
      pin: this.pin
    }
    this.appService.cardValidation(this.data).subscribe((apiResponse) => {
      console.log('apiResponse', apiResponse)
      if(apiResponse.status === 200){
        localStorage.setItem('card_number', apiResponse.data[0].card_number);
      this.route.navigate(["/screen2"]);
      console.log("Login Successful");
      }
      else if (apiResponse.status === 404){
        alert(apiResponse.message);
        this.card_number = '';
        this.pin= '';
      }
      else if (apiResponse.status === 500){
        alert(apiResponse.message);
        this.card_number = '';
        this.pin= '';
      }
    }, (error) => {
      console.log(error)

    })
  }
  
}
