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
  
  //filterValue: Array<any> = [];
  //order: boolean = false;
  
  constructor(
    private router: Router
  ) { 
//    this.filterValue = this.empdata;
  }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));
         
    
  }
  model: any = {};

  filterByText(initial: string) {
    //this.empdata = this.filterValue;

    if (initial === "") {
      this.empdata = JSON.parse(localStorage.getItem("emp-details")); 
    } else {
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
    if(initial === ""){
      this.empdata = JSON.parse(localStorage.getItem("emp-details"));
    } else{
      this.empdata = this.empdata.filter(i => i.empId.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    console.log(this.empdata)
  }

  deleteEmp(employee) {    
    const index = this.empdata.findIndex(x => x.empId === employee.empId);
    console.log(this.empdata.splice(index,1));
    localStorage.setItem("emp-details", JSON.stringify(this.empdata));
    
  }
  myValue;

  editEmployee(editEmp) {
    // const index = this.empdata.findIndex(x => x.empId === editEmp.empId);
    // let oldValue = localStorage.getItem('emp-details');
    // console.log(oldValue);
    // this.model.empId = this.empdata[editEmp].empId;
    // this.myValue = editEmp;

    this.router.navigate(['/reactiveform'], { queryParams: { employeeId: editEmp.empId } });
  }
  
  updateEmployee() {
    let editEmp = this.myValue;
    for(let i = 0; i < this.empdata.length; i++) {
      if(i == editEmp) {
        this.empdata[i] = this.model;
        this.model = {};
      }
    }
}
//   edit(value) {     
//     this.router.navigate('/emp-details');
//     expService.editEntry(value);

//   }

//   editEmployee(value) {
//     let oldValue = localStorage.getItem(value.key);
//     value.key = oldValue.key;
//     localStorage.setItem(value.key, value);
//   }
// }
}