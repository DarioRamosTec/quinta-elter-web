import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function SamePasswordValidator(password: string, confirmar_password: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let passwordControl : any = control.parent?.get(password)
    let confirmar_passwordControl : any = control.parent?.get(confirmar_password)

    if (passwordControl != undefined && confirmar_passwordControl != undefined) {
      return passwordControl.value != confirmar_passwordControl.value ? { samePassword: { value: control.value } } : null;
    }
    return null
  };
}
