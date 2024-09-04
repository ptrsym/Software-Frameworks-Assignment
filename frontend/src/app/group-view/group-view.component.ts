import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group.model';
import { GroupService } from '../services/GroupService';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [ActivatedRoute],
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
  }

}
