import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCrudService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // deleteEmployee(employee: any) {
  //   this.delete_employee().subscribe((response: any) => {
  //     let empdata = response
  //   })
  //   // let empdata = JSON.parse(localStorage.getItem("emp-details"));
  //   // // let empdata = this.tableData().subscribe((response:any) => {
  //   // //   empdata = response
  //   // // })
  //   // const index = empdata.findIndex(x => x.empId === employee.empId);
  //   // empdata.splice(index,1);
  //   // localStorage.setItem("emp-details", JSON.stringify(empdata));
  //   // return empdata;
  // }

  filterById(initial: string){
    let empdata = JSON.parse(localStorage.getItem("emp-details"));
    if  (initial) {
      empdata = empdata.filter(i => i.empId.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    return empdata;
  }

  filterByText(initial: string){
    // this.tableData().subscribe((response: any) => {
    //   let empdata = response
    // })
    // let empdata = this.tableData().subscribe((response:any) => {
    //   empdata = response
    // })
    let empdata = JSON.parse(localStorage.getItem("emp-details"));
    if (initial) {
      empdata = empdata.filter(i => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    return empdata;
  }

  editEmployee(empId: any) {

    this.router.navigate(['/reactiveform'], { queryParams: { employeeId: empId }});
  }

  delete_employee(empId){
    return this.http.delete('http://127.0.0.1:8000/myapp/delete-employee', {params: {employeeId: empId}});
  }

  saveEmployee(details: any) {
    return this.http.post('http://127.0.0.1:8000/myapp/save-employee', details);
  }

  tableData(){
    return this.http.get('http://127.0.0.1:8000/myapp/', {responseType: 'json'});
  }

  update(details){
    return this.http.put('http://127.0.0.1:8000/myapp/update', details);
  }

  empDetails(empId){
    return this.http.get('http://127.0.0.1:8000/myapp/employee-details', {params: {employeeId: empId}})
  }
}
