import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }

  validateId(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } => {
      if(!control.value){
        return null;
      }

      const regex = new RegExp('^[HIN]{3}[0-9]{3}$');
      const valid = regex.test(control.value);
      return valid ? null: { invalidempId: true };
    }
  }

  validateNumber(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } => {
      if(!control.value){
        return null;
      }
      const regex = new RegExp('^([1-9]{1})([0-9]{9})$');
      const valid = regex.test(control.value);
      return valid ? null: { invalidNumber: true };

    }
  }
   validateMail(): ValidatorFn{
     return (control: AbstractControl): {[key: string]: any } => {
       if(!control.value){
         return null;
       }
     
     const regex = new RegExp('^[a-z0-9](\.?[a-z0-9]){1,}@customfurnish\.com$');
     const valid = regex.test(control.value);
     return valid ? null: { invalidMail: true };
    }
   }
  
}
