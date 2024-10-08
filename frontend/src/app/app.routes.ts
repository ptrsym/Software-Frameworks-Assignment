import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "dashboard", component:DashboardComponent},
    {path: "groups", component:GroupsComponent},
    {path: "groups/:groupId", component:GroupViewComponent},
    {path: "manage-members", component:ManageMembersComponent},
    {path: "manage-reports", component:ManageReportsComponent},
    {path: "sign-up", component:SignUpComponent}
];
