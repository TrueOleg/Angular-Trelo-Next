import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

// export class RegistrationValidator {
//   static validate(
//     passwordFormControl: FormControl,
//     confirmPasswordFormControl: FormControl
//   ) {
//     let password = passwordFormControl.value;
//     let repeatPassword = confirmPasswordFormControl.value;

//     if (repeatPassword.length <= 0) {
//       return null;
//     }

//     if (repeatPassword !== password) {
//       return {
//         doesMatchPassword: true
//       };
//     }

//     return null;
//   }
// }

export function RegistrationValidator(
  passwordFormControl: FormControl,
  confirmPasswordFormControl: FormControl
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let password = passwordFormControl.value || null;
    let repeatPassword = confirmPasswordFormControl.value || null;
    console.log("forbidden", passwordFormControl, confirmPasswordFormControl);
    const forbidden = password === repeatPassword ? true : false;

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
