import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './employee-form/reactive-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule,MatCardModule,MatInputModule,MatButtonModule, MatSelectModule,MatTableModule} from "@angular/material";
//import { AlertModule } from 'ngx-alerts';
import { AlertsModule } from 'angular-alert-module';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    NavBarComponent,
    EmployeeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    //AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'}),
    AlertsModule.forRoot(),

    RouterModule.forRoot([
      {path: '', redirectTo: '/reactiveform', pathMatch: 'full'},
      {path: 'reactiveform',  component: ReactiveFormComponent },
      {path: 'empdetails', component: EmployeeDetailsComponent},

    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
