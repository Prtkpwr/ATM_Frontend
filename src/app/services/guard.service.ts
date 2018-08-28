
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private _http: HttpService, public router: Router) { }
  canActivate() {
    if (!this._http.isValid()) {
      this.router.navigate(["/screen1"]);
    } else {
      return true;
    }
  }
}

