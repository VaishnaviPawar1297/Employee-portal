import { Component, OnInit } from '@angular/core';
import{ReactiveFormComponent} from '../reactive-form/reactive-form.component';
import { Employee } from '../employee';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    
  }

}
