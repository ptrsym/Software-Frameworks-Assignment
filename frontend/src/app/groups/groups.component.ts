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
  errorMessage: string | null = null;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
    ) {}


  getName(id: number): string {
    return this.userService.getUserNameById(id);
  }

  ngOnInit(): void {
    this.updateGroups();
    this.currentUserId = this.authService.getUserId();
    this.currentUserRole = this.authService.getPermissions();
    console.log(this.currentUserRole);
    console.log(this.currentUserId);
  }

  viewGroup(group: Group): void {
    this.router.navigate([`/groups/${group.id}`]);
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

  leave(group: Group): void {
    this.groupService.leaveGroup(group.id, this.currentUserId);
    this.updateGroups();
  }

  delete(groupId: number): void {
    this.groupService.deleteGroup(groupId);
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
    if (this.groupService.createGroup(this.newGroupName, this.currentUserId)){
      this.errorMessage='';
      this.updateGroups();
      this.newGroupName = '';
      this.showCreateGroupForm = false;
    } else {
      this.errorMessage="error creating group, duplicate group names aren't allowed."
      console.log('naming error')
    }
  }
  
  getAdminNames(adminIds: number[]): string {
    return adminIds.map(id => this.userService.getUserNameById(id)).join(', ');
  }

  cancelCreateGroup(): void{
    this.showCreateGroupForm = false;
    this.errorMessage = null;
  }

}

