import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/GroupService';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css'
})
export class GroupViewComponent implements OnInit{
  groupId!: number;
  groupIdParam!: string;
  group: Group | undefined

  constructor(private route: ActivatedRoute, private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupIdParam = this.route.snapshot.paramMap.get('groupId') || '';
    this.groupId = this.groupIdParam ? parseInt(this.groupIdParam, 10): 0;
    this.group = this.groupService.getGroupById(this.groupId);
    if (this.group) {
      this.groupService.setViewedGroup(this.group);
    }
  }

}
