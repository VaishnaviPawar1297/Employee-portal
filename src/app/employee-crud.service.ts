import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCrudService {

  constructor(
    private router: Router,
  ) { }

  deleteEmployee(employee: any) {
    let empdata = JSON.parse(localStorage.getItem("emp-details"));
    const index = empdata.findIndex(x => x.empId === employee.empId);
    empdata.splice(index,1);
    localStorage.setItem("emp-details", JSON.stringify(empdata));
    return empdata;
  }

  filterById(initial: string){
    let empdata = JSON.parse(localStorage.getItem("emp-details"));
    if  (initial) {
      empdata = empdata.filter(i => i.empId.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    return empdata;
  }

  filterByText(initial: string){
    let empdata = JSON.parse(localStorage.getItem("emp-details"));
    if (initial) {
      empdata = empdata.filter(i => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }
    return empdata;
  }

  editEmployee(editEmp: any) {

    this.router.navigate(['/reactiveform'], { queryParams: { employeeId: editEmp.empId }});
  }

}
// deleteEmp(employee) {
//   this.dataSource = new MatTableDataSource(this.dataService.deleteEmployee(employee));
// }