import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Screen2Component } from './screen2/screen2.component';
import { Screen3Component } from './screen3/screen3.component';
import { Screen1Component } from './screen1/screen1.component';

//router module used for setting up the application level route
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuardService } from './services/guard.service';

@NgModule({
  declarations: [
    AppComponent,
    Screen2Component,
    Screen3Component,
    Screen1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'screen1', component: Screen1Component },
      { path: 'screen2', component: Screen2Component,canActivate: [GuardService] },
      { path: 'screen3', component: Screen3Component,canActivate: [GuardService] },
      { path: '', redirectTo: 'screen1', pathMatch: 'full'},
      { path: '**', redirectTo: 'screen1', pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
