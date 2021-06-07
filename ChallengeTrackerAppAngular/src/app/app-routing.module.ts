import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewProgramComponent } from "./program/create-new-program/create-new-program.component";
import { CreateNewMilestoneComponent } from "./milestone/create-new-milestone/create-new-milestone.component";
import { RegisterUserComponent } from "./userManagement/register-user/register-user.component";
import { UserLoginComponent } from "./userManagement/user-login/user-login.component";
import { ViewDashboardComponent } from "./program/view-dashboard/view-dashboard.component";
import { ViewProgramDetailsComponent } from "./program/view-program-details/view-program-details.component";
import { EditProgramComponent } from "./program/edit-program/edit-program.component";
import { EditMilestoneComponent } from "./milestone/edit-milestone/edit-milestone.component";
import { AddProgressLogComponent } from "./progressHistory/add-progress-log/add-progress-log.component";
import { DeleteMilestoneComponent } from "./milestone/delete-milestone/delete-milestone.component";
import { ViewMilestoneDetailsComponent } from "./milestone/view-milestone-details/view-milestone-details.component";
import { EditProgressLogComponent } from "./progressHistory/edit-progress-log/edit-progress-log.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'program/createProgram', component: CreateNewProgramComponent },
  { path: 'milestone/createMilestone', component: CreateNewMilestoneComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'dashboard', component: ViewDashboardComponent },
  { path: 'program/:programId', component: ViewProgramDetailsComponent },
  { path: 'program/edit/:programId', component: EditProgramComponent },
  { path: 'milestone/edit/:milestoneId', component: EditMilestoneComponent },
  { path: 'progressLog/add/:milestoneId', component: AddProgressLogComponent },
  { path: 'milestone/delete/:milestoneId', component: DeleteMilestoneComponent },
  { path: 'milestone/:milestoneId', component: ViewMilestoneDetailsComponent },
  { path: 'progressLog/edit/:progressHistoryId', component: EditProgressLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
