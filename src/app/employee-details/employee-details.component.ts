import { Component, OnInit } from '@angular/core';
import { CustomvalidationService} from '../customvalidation.service';
import{ReactiveFormComponent} from '../reactive-form/reactive-form.component';
import {FormGroup} from '@angular/forms';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
//import {Details} from '../employee'
// import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  empdata: any = [];
  dataSource: MatTableDataSource<any>;
  public displayedColumns = ['EmployeeName', 'EmployeeMail','EmployeeId','EmployeePh.No','EmployeeDesignation','Actions'];
  
    
  constructor(
    private router: Router,
    //private details: Details,
  ) { 
  }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));
    this.dataSource = new MatTableDataSource(this.empdata);
  }



  filterByText(initial: string) {


    this.empdata = JSON.parse(localStorage.getItem("emp-details")); 
    if  (initial) {
      this.empdata = this.empdata.filter(i => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    
    console.log(this.empdata);
    this.dataSource = new MatTableDataSource(this.empdata);
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
    this.dataSource = new MatTableDataSource(this.empdata);
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