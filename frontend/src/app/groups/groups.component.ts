import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/UserService';
import { GroupService } from '../services/GroupService';
import { AuthService } from '../services/AuthService';


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit{

  groups: Group[] = [];
  currentUserRole: string = '';
  currentUserId: number = 0;
  newGroupName: string = '';
  showCreateGroupForm: boolean = false;

  constructor(private groupService: GroupService, private userService: UserService, private authService: AuthService) {}


  getName(id: number): string {
    return this.userService.getUserNameById(id);
  }

  ngOnInit(): void {
    this.updateGroups();
    this.currentUserId = this.authService.getUserId();
    this.currentUserRole = this.authService.getPermissions();
  }

  updateGroups(): void {
    this.groups = this.groupService.getGroups();
  }

  isMember (group: Group): boolean {
    return group.memberId.includes(this.currentUserId)
  }

  isPending(group: Group): boolean {
    return group.pendingUserId.includes(this.currentUserId)
  }

  apply(group: Group): void {
    this.groupService.applyToGroup(group.id, this.currentUserId);
    this.updateGroups();
  }

  cancel(group: Group): void {

    this.groupService.removeApplication(group.id, this.currentUserId);
    this.updateGroups();
  }

  remove(group: Group): void {
    this.groupService.leaveGroup(group.id, this.currentUserId);
    this.updateGroups();
  }

  toggleDetails(group: Group): void{
    group.detailsOpen = !group.detailsOpen;
  }

  canManageGroup(group: Group): boolean{
    return this.currentUserRole === 'SuperAdmin' || group.adminId.includes(this.currentUserId);
    }

  canCreateGroup(): boolean {
    return this.currentUserRole === 'SuperAdmin' || this.currentUserRole === 'GroupAdmin';
  }

  createGroup(): void {
    try {
      this.groupService.createGroup(this.newGroupName, this.currentUserId);
      this.updateGroups();
      this.newGroupName = '';
      this.showCreateGroupForm = false;
    }
    catch (error) {
      console.log(error);
    }
  }

  getAdminNames(adminIds: number[]): string {
    return adminIds.map(id => this.userService.getUserNameById(id)).join(', ');
  }


}

