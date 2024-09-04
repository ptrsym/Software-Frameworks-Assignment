import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';



export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "dashboard", component:DashboardComponent},
    {path: "groups", component:GroupsComponent},
    {path: "group/:groupId", component:GroupViewComponent},
    {path: "manage-members", component:ManageMembersComponent},
    {path: "manage-reports", component:ManageReportsComponent} 
];
