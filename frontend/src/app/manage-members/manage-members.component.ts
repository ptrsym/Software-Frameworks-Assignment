import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import { SuperService } from '../services/SuperService';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-members.component.html',
  styleUrl: './manage-members.component.css'
})
export class ManageMembersComponent implements OnInit {

  users: User[] = [];
  selectedUserId: number | null = null;
  dropdownOpen: boolean = false;

  constructor(private userService: UserService, private superService: SuperService) {}


  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  openDropdown(userId: number): void {
    this.selectedUserId = userId;
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
    console.log(this.selectedUserId);
  }

  promoteToGroupAdmin(): void {
    if (this.selectedUserId !== null) {
      this.superService.promoteUser(this.selectedUserId, 'GroupAdmin')
      this.dropdownOpen = false;
      this.ngOnInit();
    }
  }

  promoteToSuperAdmin(): void {
    if (this.selectedUserId !== null) {
      this.superService.promoteUser(this.selectedUserId, 'SuperAdmin')
      this.dropdownOpen = false;
      this.ngOnInit();
    }
  }

  demoteToUser(): void {
    if(this.selectedUserId !== null) {
      this.superService.demoteUser(this.selectedUserId);
      this.dropdownOpen = false;
      this.ngOnInit();
    }
  }

  deleteUser(): void {
    if (this.selectedUserId !== null) {
      this.superService.deleteUser(this.selectedUserId);
      this.dropdownOpen = false;
      this.ngOnInit();
    }
  }

}
