import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/AuthService'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  username: string = '';
  password: string = '';
  errormsg: string = '';

  onSubmit() :void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
      this.errormsg = '';
    } else {
      this.errormsg = 'Invalid login details, please try again';
    }    
  }
}
