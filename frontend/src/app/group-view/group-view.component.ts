import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/GroupService';
import { Group } from '../models/group.model';
import { AuthService } from '../services/AuthService';
import { CommonModule } from '@angular/common';
import { PendingApplicationsComponent } from '../pending-applications/pending-applications.component';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [CommonModule, PendingApplicationsComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  groupId!: number;
  groupIdParam!: string;
  group: Group | undefined
  isApplicationVisible: boolean = false;
  activeGroup: Group | null = null;
  currentUserRole: string = '';
  currentUserId: number = 0;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private authService: AuthService) {}

  ngOnInit(): void {
    this.groupIdParam = this.route.snapshot.paramMap.get('groupId') || '';
    this.groupId = this.groupIdParam ? parseInt(this.groupIdParam, 10): 0;
    this.group = this.groupService.getGroupByGroupId(this.groupId);
    if (this.group) {
      this.groupService.setViewedGroup(this.group);
      this.activeGroup = this.group;
    }

    this.currentUserId = this.authService.getUserId();
    this.currentUserRole = this.authService.getPermissions();
    console.log(this.currentUserRole);
    console.log(this.currentUserId);
  }

  togglePendingApplications(): void {
    this.isApplicationVisible = !this.isApplicationVisible;
  }

  canManageGroup(group: Group): boolean{
    return this.currentUserRole === 'SuperAdmin' || group.adminId.includes(this.currentUserId);
    }

}





