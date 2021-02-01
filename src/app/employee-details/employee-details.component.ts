import { Component, OnInit } from '@angular/core';
import { CustomvalidationService} from '../customvalidation.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { EmployeeCrudService } from '../employee-crud.service';
import { HttpClient } from '@angular/common/http';


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
    private dataService: EmployeeCrudService,
    private http : HttpClient
  ) { 
  }

  ngOnInit() {
    this.empdata = JSON.parse(localStorage.getItem("emp-details"));
    this.dataSource = new MatTableDataSource(this.empdata);
  }

  filterByText(initial: string) {
    this.dataSource = new MatTableDataSource(this.dataService.filterByText(initial));
  }

  filterById(initial: string){    
    this.dataSource = new MatTableDataSource(this.dataService.filterById(initial));
  }

  deleteEmp(employee) {
  this.dataSource = new MatTableDataSource(this.dataService.deleteEmployee(employee));
  }

  editEmployee(editEmp) {
    this.dataService.editEmployee(editEmp)
  }

  // // storeData(store){
  // //   this.http.get('http://127.0.0.1:8000/myapp/', {responseType: 'json'}).subscribe((response: any) =>



  // }



}