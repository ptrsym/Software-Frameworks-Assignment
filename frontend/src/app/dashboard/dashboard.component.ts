import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { GroupService } from '../services/GroupService';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService,
     private groupService: GroupService,
    private router: Router){}

    userGroups: Group[] = [];
    userProfile!: User;


  ngOnInit(): void {
    const userProfile = this.authService.getUserById();
    this.userGroups = [];

    if (userProfile) {
      this.userProfile = userProfile;
      this.userGroups = this.groupService.getGroupsByUserId(this.userProfile.id);   
    }
    
    console.log(this.userProfile, this.userGroups);
  }

  editProfile(): void {
    // edit profile logic
  }

  deleteProfile(): void {
    // deletes the user
  }

}
