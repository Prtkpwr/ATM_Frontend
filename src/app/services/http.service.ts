import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public Url = 'http://localhost:3000/api/v1'

  constructor(private _http: HttpClient, public route: Router) { 
    console.log("HTTP service is called")
  }

    // Error Handler for HTTP
    private handleError(err: HttpErrorResponse) {
      console.log("Handle error Http calls")
      console.log(err.message);
      return Observable.throw(err.message)
    }
    
    // card and pin validation
    public cardValidation(data):any{
      return this._http.post((this.Url + '/cards/validate'), data)
    } 
    public changePin(data):any{
      return this._http.put((this.Url + '/cards/edit'), data)
    }
    public withdraw(data):any{
      return this._http.post((this.Url + '/cards/withdraw'), data)
    }
    public checkBal(data):any{
      return this._http.post((this.Url + '/cards/check_balance'), data)
    }
}
