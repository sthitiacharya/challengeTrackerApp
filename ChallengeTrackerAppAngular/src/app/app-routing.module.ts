import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewProgramComponent } from "./program/create-new-program/create-new-program.component";
import { CreateNewMilestoneComponent } from "./milestone/create-new-milestone/create-new-milestone.component";
import { RegisterUserComponent } from "./userManagement/register-user/register-user.component";
import { UserLoginComponent } from "./userManagement/user-login/user-login.component";
import { ViewDashboardComponent } from "./program/view-dashboard/view-dashboard.component";
import { ViewProgramDetailsComponent } from "./program/view-program-details/view-program-details.component";
import { EditProgramComponent } from "./program/edit-program/edit-program.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'program/createProgram', component: CreateNewProgramComponent },
  { path: 'milestone/createMilestone', component: CreateNewMilestoneComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: UserLoginComponent },
  {path: 'dashboard', component: ViewDashboardComponent},
  {path: 'program/:programId', component: ViewProgramDetailsComponent},
  {path: 'program/edit/:programId', component: EditProgramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
