import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewProgramComponent } from './program/create-new-program/create-new-program.component';
import { CreateNewMilestoneComponent } from './milestone/create-new-milestone/create-new-milestone.component';
import { RegisterUserComponent } from './userManagement/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewProgramComponent,
    CreateNewMilestoneComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
