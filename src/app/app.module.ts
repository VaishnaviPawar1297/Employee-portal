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
import { HttpClientModule } from '@angular/common/http';
import { EmployeeCrudService } from './employee-crud.service';
import { DesignationComponent } from './designation/designation.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    NavBarComponent,
    EmployeeDetailsComponent,
    DesignationComponent,
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
    HttpClientModule,
    AlertsModule.forRoot(),

    RouterModule.forRoot([
      {path: '', redirectTo: '/reactiveform', pathMatch: 'full'},
      {path: 'reactiveform',  component: ReactiveFormComponent },
      {path: 'empdetails', component: EmployeeDetailsComponent},
      {path: 'designation', component: DesignationComponent },

    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
