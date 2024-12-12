import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

  onGetStarted() {
    this.router.navigate(['form']);
  }

}
