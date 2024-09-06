import { Component } from '@angular/core';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  username:string = '';
  password:string = '';
  email:string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.errorMessage = '';

    if (!this.username || !this.email ||!this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }

    const existingUsers = this.userService.getUsers();
    const usernameExists = existingUsers.some(user => user.username === this.username);
    const emailExists = existingUsers.some(user => user.email === this.email);

    if(usernameExists) {
      this.errorMessage = 'Username taken. Please try again.';
      return;
    }

    if(emailExists) {
      this.errorMessage = 'Email already exists. Please try another email.';
      return
    }

    this.userService.createUser(this.username, this.email, this.password)
    this.authService.login(this.username, this.password);
    this.router.navigate(['/dashboard']);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

}
