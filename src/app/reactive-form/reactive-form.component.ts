import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../customvalidation.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  //empdata: any = [];
  registerForm: FormGroup;
  submitted = false;
  employeId: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.employeId = this.route.snapshot.queryParams.employeeId;

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
      const employee = this.getEmployeeById(this.employeId);
      this.registerForm.setValue(employee);
      this.removeValidators("username");
      this.removeValidators("password");
      this.removeValidators("confirmPassword");
    }
      
  }

  removeValidators(field: string) {
    this.registerForm.get(field).setValidators([]);
    this.registerForm.get(field).updateValueAndValidity();
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let employeeData = [];

    if (this.registerForm.valid) {
      
      if (!localStorage.getItem("emp-details")) {
        employeeData.push(this.registerForm.value);
      } else {
        employeeData = JSON.parse(localStorage.getItem("emp-details"));
        const names = [];
        const email = [];
        const phones = [];
        const empIds = [];
        let index = -1;
        if (this.employeId) {
          index = this.getIndex(this.employeId);
        }
        for (let employee of employeeData) {
          if (employeeData.indexOf(employee) !== index ) {
            names.push(employee.name);
            email.push(employee.email);
            phones.push(employee.empNumber);
            empIds.push(employee.empId);
          }
        }
        const data = this.registerForm.value;
        if (names.includes(data.name)) {
          this.duplicateFound('name');
          return;
        }
        if (email.includes(data.email)) {
          this.duplicateFound('email');
          return;
        }
        if (phones.includes(data.empNumber)) {
          this.duplicateFound('empNumber');
          return;
        }
        if (empIds.includes(data.empId))  {
          this.duplicateFound('empId)');
          return;
        }
        if (this.employeId) {
          employeeData.splice(index, 1, this.registerForm.value);
        } else {
          employeeData.push(this.registerForm.value);
        }
      }

      localStorage.setItem('emp-details', JSON.stringify(employeeData));
      alert('Form Submitted succesfully!!!');
     
      this.registerForm.reset();
      this.submitted = false;
    }
  }

  duplicateFound(dupType: string) {
    alert('This ' + dupType + ' already exists!!!');
  }

  onCancel(){
    this.router.navigate(['']);
  }

  validateForm() {
    this.submitted = false;
  }

  getEmployeeById(empId: any) {
    const employees = JSON.parse(localStorage.getItem("emp-details"));
    let i;

    for (i = 0; i < employees.length; i++) {
      if (employees[i].empId === empId) {
        return employees[i];
      }
    }
  }

  getIndex(empId) {
    const employees = JSON.parse(localStorage.getItem("emp-details"));

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].empId === empId) {
        return i;
      }
    }
  }



  }
