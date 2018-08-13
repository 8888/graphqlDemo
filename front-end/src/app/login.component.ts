import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  styles: ['.container {border: 1px solid black}'],
  template: `
  <div class="container">
    <form #loginForm="ngForm">
      <div>
        <label for="email">Email: </label>
        <input type="text" [(ngModel)]="model.email" name="email">
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="text" [(ngModel)]="model.password" name="password">
      </div>
      <button type="submit" (click)="onLogin()">Login</button>
      <button type="submit" (click)="onRegister()">Register</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  public model = {
    email: '',
    password: ''
  };

  public onLogin() {
    this.authService.login(this.model.email, this.model.password);
  }

  public onRegister() {
    console.log(this.model);
    console.log('register');
  }
}
