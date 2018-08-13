import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  styles: ['.container {border: 1px solid black} .megaSmall {font-size: 8px}'],
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
    <div *ngIf="authService.user">
      <p>Signed in as {{authService.user!.email}}</p>
      <p class="megaSmall">token: {{authService.user!.token}}</p>
    </div>
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
    const email = this.model.email;
    this.authService.login(email, this.model.password).subscribe(user => {
      console.log(user);
      if (user['data']['signinUser']) {
        this.authService.storeUser(
          email,
          user['data']['signinUser']['token'] // wow gross
        );
      }
    });
  }

  public onRegister() {
    this.authService.register(this.model.email, this.model.password).subscribe(console.log);
  }
}
