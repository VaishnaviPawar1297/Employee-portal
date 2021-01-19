import { Component, OnInit } from '@angular/core';
import{ReactiveFormComponent} from '../reactive-form/reactive-form.component';
//import { Employee } from '../employee';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  //registerForm: FormGroup;
  empdata: any = [];
  
  constructor() { }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));     
    
  }

  

}
