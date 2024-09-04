import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { GroupService } from '../services/GroupService';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  userGroups: Group[] = [];
  userProfile: User;

}
