import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './home/component/dashboard/dashboard.component';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent,DashboardComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,
    FormsModule, IonicModule,ReactiveFormsModule, IonicStorageModule.forRoot(),HomePageModule

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
