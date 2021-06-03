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

@NgModule({
  declarations: [
    AppComponent,
    CreateNewProgramComponent,
    CreateNewMilestoneComponent,
    RegisterUserComponent,
    UserLoginComponent,
    ViewDashboardComponent,
    ViewProgramDetailsComponent,
    EditProgramComponent
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
    MatTableModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
