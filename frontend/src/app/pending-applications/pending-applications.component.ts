import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { GroupService } from '../services/GroupService';
import { UserService } from '../services/UserService';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-pending-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-applications.component.html',
  styleUrl: './pending-applications.component.css'
})
export class PendingApplicationsComponent implements OnInit{

 
  currentGroup$: Observable<Group | null>;
  pendingUserIds: number[] = [];
  pendingUsers: any[] = [];
  isVisible: boolean = true;
  
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private groupService: GroupService, private userService: UserService){
    this.currentGroup$ = this.groupService.currentGroup$;
  }

  ngOnInit(): void {
    this.currentGroup$.subscribe(group => {
      if (group) {
        this.pendingUserIds = group.pendingUserId;
      }
    });
  }


  getUserName(userId: number): string {
    return this.userService.getUserNameById(userId);
  }

  approve(userId: number): void {
    this.groupService.approveApplication(userId);
  }

  reject(userId: number): void {
    this.groupService.rejectApplication(userId);
  }

}
