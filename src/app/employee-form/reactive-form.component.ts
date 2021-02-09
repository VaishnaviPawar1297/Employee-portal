import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { CustomvalidationService } from '../customvalidation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { HttpClient } from '@angular/common/http';
import { EmployeeCrudService } from '../employee-crud.service';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  public registerForm: FormGroup;

  roles: any;
  submitted = false;
  employeId: any;
  update: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private route: ActivatedRoute,
    private alerts: AlertsService,
    private http: HttpClient,
    private employeeService: EmployeeCrudService
  ) { }
  ngOnInit() {
    this.employeId = this.route.snapshot.queryParams.employeeId;
    this.getDesignation();
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, this.customValidator.validateMail()])],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      empNumber: ['', Validators.compose([Validators.required, this.customValidator.validateNumber()])],
      empId: ['', Validators.compose([Validators.required, this.customValidator.validateId()])],
      empRole: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );

    if (this.employeId) {
      this.update = true;
      const employee = this.getEmployeeById(this.employeId);
      
    }
      
  }

  removeValidators(field: string) {
    this.registerForm.get(field).setValidators([]);
    this.registerForm.get(field).updateValueAndValidity();
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit(formData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    //let employeeData = [];

    if (this.registerForm.valid) {
      
      // if (!localStorage.getItem("emp-details")) {
      //   employeeData.push(this.registerForm.value);
      // } else {
      //   employeeData = JSON.parse(localStorage.getItem("emp-details"));
      //   const names = [];
      //   const email = [];
      //   const phones = [];
      //   const empIds = [];
      //   let index = -1;
      //   if (this.employeId) {
      //     index = this.getIndex(this.employeId);
      //   }
      //   for (let employee of employeeData) {
      //     if (employeeData.indexOf(employee) !== index ) {
      //       names.push(employee.name);
      //       email.push(employee.email);
      //       phones.push(employee.empNumber);
      //       empIds.push(employee.empId);
      //     }
      //   }
      //   const data = this.registerForm.value;
      //   if (names.includes(data.name)) {
      //     this.duplicateFound('name');
      //     return;
      //   }
      //   if (email.includes(data.email)) {
      //     this.duplicateFound('email');
      //     return;
      //   }
      //   if (phones.includes(data.empNumber)) {
      //     this.duplicateFound('empNumber');
      //     return;
      //   }
      //   if (empIds.includes(data.empId))  {
      //     this.duplicateFound('empId');
      //     return;
      //   }
      //   if (this.employeId) {
      //     employeeData.splice(index, 1, this.registerForm.value);
      //   } else {
      //     employeeData.push(this.registerForm.value);
      //   }
     

      // localStorage.setItem('emp-details', JSON.stringify(employeeData));
       //alert('Form Submitted succesfully!!!');
       if(this.update) {
        this.employeeService.update(this.registerForm.value).subscribe(response => {
          console.log('Succes')
          alert("updated sucessfully")

          this.registerForm.reset();
          formDirective.resetForm();
        },
        error => {
          alert(error.error.msg);
        }
        );
       } else {
        this.employeeService.saveEmployee(this.registerForm.value).subscribe(response => {
          console.log('Succes')
          alert('Form Submitted succesfully!!!');
     
          this.registerForm.reset();
          formDirective.resetForm();
        },
        error => {
          
          alert(error.error.msg);
        });
       }
       //this.submitted = false;
    }
  }


  duplicateFound(dupType: string) {
    alert('This ' + dupType + ' already exists!!!');
  }
  
  getEmployeeById(empId: any) {
    this.employeeService.empDetails(empId).subscribe((response: any) => {
      this.registerForm.get('empId').setValue(response.empId);
      this.registerForm.get('empNumber').setValue(response.empNumber);
      this.registerForm.get('name').setValue(response.name);
      this.registerForm.get('empRole').setValue(response.empRole);
      this.registerForm.get('email').setValue(response.email);

      this.removeValidators("username");
      this.removeValidators("password");
      this.removeValidators("confirmPassword");
    })
  }

  getDesignation(){
    this.employeeService.getDesignation().subscribe((response: any) => {
      this.roles = response
    });
  }

  // getIndex(empId) {    
  //   const employees = JSON.parse(localStorage.getItem("emp-details"));

  //   for (let i = 0; i < employees.length; i++) {
  //     if (employees[i].empId === empId) {
  //       return i;
  //     }
  //   }
  // }
}
