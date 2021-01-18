import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../customvalidation.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
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
      empRole: [''],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  get registerFormControl() {
    localStorage.setItem('emp-details', JSON.stringify(this.registerForm.value));
    return this.registerForm.controls;
    
    
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      let formValue = JSON.parse(localStorage.getItem('emp-details'))

      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
      console.log(formValue)

    }
  }
  onCancel(){
    this.router.navigate(['']);
  }
}
