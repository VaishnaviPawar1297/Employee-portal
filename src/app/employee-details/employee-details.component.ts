import { Component, OnInit } from '@angular/core';
import { CustomvalidationService} from '../customvalidation.service';
import{ReactiveFormComponent} from '../reactive-form/reactive-form.component';
import {FormGroup} from '@angular/forms';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  empdata: any = [];
  

  
  constructor(
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));
  }



  filterByText(initial: string) {


    this.empdata = JSON.parse(localStorage.getItem("emp-details")); 
    if  (initial) {
      this.empdata = this.empdata.filter(i => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    
    console.log(this.empdata);
  }
  // sortData() {
  //   if (this.order) {
  //     this.empdata = this.empdata.sort((i, j) => (j.empId > i.empId ? -1 : 1));
  //   }
  //   else {
  //     this.empdata = this.empdata.sort((i, j) => (j.empId > i.empId ? 1 : -1));
  //   }
    
  //   this.order = !this.order;
  // }

  filterById(initial: string){
    
    this.empdata = JSON.parse(localStorage.getItem("emp-details")); 
    if  (initial) {
      this.empdata = this.empdata.filter(i => i.empId.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    console.log(this.empdata)
  }

  deleteEmp(employee) {    
    const index = this.empdata.findIndex(x => x.empId === employee.empId);
    console.log(this.empdata.splice(index,1));
    localStorage.setItem("emp-details", JSON.stringify(this.empdata));
    
  }

  editEmployee(editEmp) {

    this.router.navigate(['/reactiveform'], { queryParams: { employeeId: editEmp.empId } });
  }

}