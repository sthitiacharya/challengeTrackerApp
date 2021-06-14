import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewProgramComponent } from './program/create-new-program/create-new-program.component';
import { CreateNewMilestoneComponent } from './milestone/create-new-milestone/create-new-milestone.component';
import { RegisterUserComponent } from './userManagement/register-user/register-user.component';
import { UserLoginComponent } from './userManagement/user-login/user-login.component';

//import { AuthInterceptor } from './helpers/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewDashboardComponent } from './program/view-dashboard/view-dashboard.component';
import { ViewProgramDetailsComponent } from './program/view-program-details/view-program-details.component';
import { EditProgramComponent } from './program/edit-program/edit-program.component';
import { EditMilestoneComponent } from './milestone/edit-milestone/edit-milestone.component';
import { AddProgressLogComponent } from './progressHistory/add-progress-log/add-progress-log.component';
import { DeleteMilestoneComponent } from './milestone/delete-milestone/delete-milestone.component';
import { ViewMilestoneDetailsComponent } from './milestone/view-milestone-details/view-milestone-details.component';
import { EditProgressLogComponent } from './progressHistory/edit-progress-log/edit-progress-log.component';
import { ViewRemindersComponent } from './userManagement/view-reminders/view-reminders.component';
import { ViewAllRewardsComponent } from './reward/view-all-rewards/view-all-rewards.component';
import { ViewRewardDetailsComponent } from './reward/view-reward-details/view-reward-details.component';
import { ViewRedeemedRewardsComponent } from './reward/view-redeemed-rewards/view-redeemed-rewards.component';
import { ConfirmDialogComponent } from './confirmDialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewProgramComponent,
    CreateNewMilestoneComponent,
    RegisterUserComponent,
    UserLoginComponent,
    ViewDashboardComponent,
    ViewProgramDetailsComponent,
    EditProgramComponent,
    EditMilestoneComponent,
    AddProgressLogComponent,
    DeleteMilestoneComponent,
    ViewMilestoneDetailsComponent,
    EditProgressLogComponent,
    ViewRemindersComponent,
    ViewAllRewardsComponent,
    ViewRewardDetailsComponent,
    ViewRedeemedRewardsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
