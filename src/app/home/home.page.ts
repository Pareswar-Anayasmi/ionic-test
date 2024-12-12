import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) { }

  login() {
    if (this.email === '1234' && this.password === '1234') {

      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
