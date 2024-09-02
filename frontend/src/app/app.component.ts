import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { User } from './models/user.model';
import { AuthService } from './services/AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  title = 'ChatApp';
  users: User[] = [];

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {

    //check if a user is logged in
    this.isLoggedIn = this.authService.isAuthenticated();

    //initialise main component with storage values

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('groups')) {
      localStorage.setItem('groups', JSON.stringify([]));
    }
    if (!localStorage.getItem('channels')) {
      localStorage.setItem('channels', JSON.stringify([]));
    }
    if (!localStorage.getItem('groupadmins')) {
      localStorage.setItem('groupadmins', JSON.stringify([]));
    }

    // add a default super admin if it doesnt exist
      this.users = JSON.parse(localStorage.getItem('users') || '[]');

      if (!this.users.find((user: any) => user.username === 'super')) {
        const defaultSuper:User = new User (
          1,
          'super',
          'superadmin@mean.dev',
          '123',
          ['superadmin'],
          []
        );
        this.users.push(defaultSuper);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
  }

}
