import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/GroupService';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { ChannelService } from '../services/ChannelService';
import { CommonModule } from '@angular/common';
import { PendingApplicationsComponent } from '../pending-applications/pending-applications.component';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [CommonModule, PendingApplicationsComponent, FormsModule],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  groupId!: number;
  groupIdParam!: string;
  group: Group | undefined
  channels: Channel[] = [];
  activeChannels: number[] = [];
  channelNames: string [] = []
  newChannelName: string = '';
  isApplicationVisible: boolean = false;
  activeGroup: Group | null = null;
  currentUserRole: string = '';
  currentUserId: number = 0;

  constructor(private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthService,
    private userService: UserService,
    private channelService: ChannelService,
  ) {}

  ngOnInit(): void {
    this.groupIdParam = this.route.snapshot.paramMap.get('groupId') || '';
    this.groupId = this.groupIdParam ? parseInt(this.groupIdParam, 10): 0;

        // Subscribe to changes in the currently viewed group
        this.groupService.currentGroup$.subscribe((group) => {
          if (group) {
              this.group = group;
              this.activeGroup = group;
              this.activeChannels = this.group.channelId;
              this.channelNames = this.getChannelNames(this.activeChannels);
          }
      });
  
      this.currentUserId = this.authService.getUserId();
      this.currentUserRole = this.authService.getPermissions();
  }

  //   this.group = this.groupService.getGroupByGroupId(this.groupId);
  //   this.channels = this.channelService.getChannels();
  //   if (this.group) {
  //     this.groupService.setViewedGroup(this.group);
  //     this.activeGroup = this.group;
  //     this.activeChannels = this.group.channelId
  //     this.channelNames = this.getChannelNames(this.activeChannels);
  //   }
  //   this.currentUserId = this.authService.getUserId();
  //   this.currentUserRole = this.authService.getPermissions();
  //   console.log(this.currentUserRole);
  //   console.log(this.currentUserId);
  // }

  getChannelNames(channelIds: number[]): string[] {
     return channelIds.map(id => this.channelService.getChannelNameById(id));
  }

  addChannel(): void {
    if (this.group && this.newChannelName) {
      const channels = JSON.parse(localStorage.getItem('channels') || '[]')
      const newChannelId = this.channelService.findLowestChannelId(channels);
      const newChannel = new Channel(newChannelId, this.newChannelName, [], this.group.id);

      this.groupService.addChannelToGroup(this.group.id, newChannel.id);
      channels.push(newChannel);
      this.channelService.saveChannels(channels);
      this.channelNames = this.getChannelNames(this.group.channelId);
      this.newChannelName = '';
    }
  }


  togglePendingApplications(): void {
    this.isApplicationVisible = !this.isApplicationVisible;
  }

  canManageGroup(group: Group): boolean{
    return this.currentUserRole === 'SuperAdmin' || group.adminId.includes(this.currentUserId);
    }

    getMemberNames(): string[] {
      if (this.group) {
        return this.group.memberId.map(userId => this.userService.getUserNameById(userId));
      }
      return [];
    }

}





