import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../customvalidation.service';
import { Router } from '@angular/router';
//import { Employee } from '../employee';
//import {empRole} from '../employee';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  //empdata: any = [];
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
  ) { }
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.compose([Validators.required, this.customValidator.validateMail()])]],
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
  }
  get registerFormControl() {
    return this.registerForm.controls;
    
    
  }
  onSubmit() {
    this.submitted = true;
    let employeeData = [];

    if (this.registerForm.valid) {
      // localStorage.setItem('emp-details', JSON.stringify(this.registerForm.value));
      // let formValue = JSON.parse(localStorage.getItem('emp-details'));

      // alert('Form Submitted succesfully!!!');
      // console.table(this.registerForm.value);
      // console.log(formValue);
      // this.empdata.push(this.registerForm.value);
      // console.log(this.empdata);
      // this.registerForm.reset();

      
      if (!localStorage.getItem("emp-details")) {
        employeeData.push(this.registerForm.value);
      } else {
        employeeData = JSON.parse(localStorage.getItem("emp-details"));
        const names = [];
        const email = [];
        const phones = [];
        const empIds = [];
        for (let employee of employeeData) {
          names.push(employee.name);
          email.push(employee.email);
          phones.push(employee.empNumber);
          empIds.push(employee.empId);
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
        employeeData.push(this.registerForm.value);
      }

      localStorage.setItem('emp-details', JSON.stringify(employeeData));
      alert('Form Submitted succesfully!!!');
     
      this.registerForm.reset();
      this.submitted = false;
    }
  }

  duplicateFound(dupType: string) {
    alert('Duplicate ' + dupType + ' already exists!!!');
  }

  onCancel(){
    this.router.navigate(['']);
  }

  validateForm() {
    this.submitted = false;
  }

  //editData(obj){
    //console.log("In edit Data");
    //console.log(obj);
    //this.registerForm.patchValue(obj);
    

  }
 // deleteData()

//}
