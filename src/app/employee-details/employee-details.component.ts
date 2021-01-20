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
  empdata: any = [];
  
  filterValue: Array<any> = [];
  order: boolean = false;
  
  constructor() { 
//    this.filterValue = this.empdata;
  }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));     
    
  }

  filterByText(initial: string) {
    //this.empdata = this.filterValue;

    if (initial === "") {
      this.empdata = JSON.parse(localStorage.getItem("emp-details"));   
    } else {
      this.empdata = this.empdata.filter(i => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    
    console.log(this.empdata);
  }
  sortData() {
    if (this.order) {
      this.empdata = this.empdata.sort((i, j) => (j.empId > i.empId ? -1 : 1));
    }
    else {
      this.empdata = this.empdata.sort((i, j) => (j.empId > i.empId ? 1 : -1));
    }
    
    this.order = !this.order;
  }

  filterById(initial: string){
    if(initial === ""){
      this.empdata = JSON.parse(localStorage.getItem("emp-details"));
    } else{
      this.empdata = this.empdata.filter(i => i.empId.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
  }
}
