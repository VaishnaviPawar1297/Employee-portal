import { Component, OnInit } from '@angular/core';
import { EmployeeCrudService } from '../employee-crud.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  empdata: any = [];
  dataSource: MatTableDataSource<any>;
  public displayedColumns = ['EmployeeName', 'EmployeeDesignation'];

  constructor(
    private dataService: EmployeeCrudService,
  ) { }

  ngOnInit() {
    this.getDataFromDjango();
  }

  getDataFromDjango() {
    this.dataService.tableData().subscribe((response: any) => {
      this.empdata = response;
      this.dataSource = new MatTableDataSource(this.empdata);
    });
  }

}
