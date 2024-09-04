import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { User } from './models/user.model';
import { Group } from './models/group.model';
import { GroupService } from './services/GroupService';
import { AuthService } from './services/AuthService';
import { CommonModule } from '@angular/common';
import { Observable, filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  currentGroup$: Observable<Group | null>;
  isLoggedIn: boolean = false;
  isSuperAdmin: boolean = false;
  isOnSignUpPage = false;
  currentRoute: string = '';

  constructor(private groupService: GroupService, private authService: AuthService, private router: Router) {
  this.currentGroup$ = this.groupService.currentGroup$;
  }

  title = 'ChatApp';
  users: User[] = [];

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    //subscribe to the current route

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    //subscribe to the current user's role
    this.authService.userRole$.subscribe(role => {
      this.isSuperAdmin = role ==='SuperAdmin';
      this.isLoggedIn = !!role;
    })

    //check if a user is logged in
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard'])
    } else {
      this.router.navigate(['/login'])
    }

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
          ['SuperAdmin'],
          []
        );
        this.users.push(defaultSuper);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
  }

}
