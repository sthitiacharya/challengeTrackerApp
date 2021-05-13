import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewProgramComponent } from "./program/create-new-program/create-new-program.component";
import { CreateNewMilestoneComponent } from "./milestone/create-new-milestone/create-new-milestone.component";
const routes: Routes = [
  { path: '', redirectTo: '/program/createProgram', pathMatch: 'full' },
  { path: 'program/createProgram', component: CreateNewProgramComponent },
  { path: 'milestone/createMilestone', component: CreateNewMilestoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
