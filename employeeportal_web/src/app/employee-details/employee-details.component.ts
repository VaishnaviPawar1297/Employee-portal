import { Component, OnInit } from '@angular/core';
import { CustomvalidationService} from '../customvalidation.service';
import { Router } from '@angular/router';
import { MatTableDataSource, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { EmployeeCrudService } from '../employee-crud.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  empdata: any = [];
  dataSource: MatTableDataSource<any>;
  public displayedColumns = ['EmployeeName', 'EmployeeMail','EmployeeId','EmployeePh.No','EmployeeDesignation','Actions'];
  totalPages: any;
  currentPage: any;
  pageNum: any;
  next: string
  previous:string
  totalCount: any;
  // fetchNext: MatTableDataSource<any>;
  
    
  constructor(
    private router: Router,
    private dataService: EmployeeCrudService,
    private http : HttpClient
  ) {
  }

  ngOnInit() {
    this.getDataFromDjango();
  }

  getDataFromDjango() {
    this.dataService.tableData(this.getFilters()).subscribe((response: any) => {
      this.empdata = response.data;
      this.totalPages = response.totalPages;
      this.totalCount = response.totalCount;

      // if (this.totalPages){
      //   this.next = this.totalPages.currentPage
      // }

      // if (this.totalPages.data.previous){
      //   this.previous = this.totalPages.data.previous
      // }
      // this.currentPage = response.currentPage;
      // this.pageNum = response.pageNum;

      // this.fetchNext = this.pageNum
      this.dataSource = new MatTableDataSource(this.empdata);
    });
  }

  onPageChange(event) {
    this.currentPage = event.pageIndex + 1;
    this.getDataFromDjango();
  }

  getFilters() {
    return {
      pageNum: this.currentPage || 1
    };
  }

  // fetchNext() {
  //   this.getDataFromDjango(this.next);
  // }

  // fetchPrevious() {
  //   this.getDataFromDjango(this.previous);
  // }

  filterByText(initial: string) {
    this.dataService.filterByText(initial).subscribe((response: any) => {
      // this.empdata = response;
      this.dataSource = new MatTableDataSource(response)
    });
  }

  filterById(initial: string){    
    // this.dataSource = new MatTableDataSource(this.dataService.filterById(initial, this.empdata));
    this.dataService.filterById(initial).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response)
    })
  }

  deleteEmp(employeeId) {
     this.dataService.delete_employee(employeeId).subscribe((response: any) => {
       console.log(response)
       this.getDataFromDjango()
     });
  }

  editEmployee(editEmp) {
    this.dataService.editEmployee(editEmp)
  }

}