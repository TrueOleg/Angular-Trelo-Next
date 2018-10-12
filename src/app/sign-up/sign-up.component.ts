import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../service/auth.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { MyErrorStateMatcher } from "../_helpers/my-error-state-matcher";

import { Observable, of } from "rxjs";

import { User } from "../user";
import { RegistrationValidator } from "../_helpers/registration-validator";
import { AlertService } from "../service/alert-service.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  // model: any = {};
  loading = false;
  returnUrl: string;
  // emailFormControl: any;
  passwordsForm: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    // this.passwordsForm = this.formBuilder.group(
    //   {
    //     password: ["", [Validators.required, Validators.minLength(6)]],
    //     confirmPassword: ["", [Validators.required]]
    //   },
    //   {
    //     validator: RegistrationValidator.validate.bind(this)
    //   }
    // );
    // // this.emailFormControl = this.formBuilder.group({
    // //   email: ["", [Validators.required, Validators.email]]
    // // });
    // this.emailFormControl = new FormGroup({
    //   email: new FormControl("null", Validators.required)
    // });
    // console.log(this.emailFormControl);
  }

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  getFormControl() {
    const passwordFormControl = new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]);
    return passwordFormControl;
  }

  getConfirmPassword() {
    const passwordFormControl = new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]);
    return passwordFormControl;
  }

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);

  confirmPasswordFormControl = new FormControl("", [
    Validators.required,
    RegistrationValidator(this.getFormControl(), this.getConfirmPassword())
  ]);

  // onChange() {
  //   console.log(
  //     "forms",
  //     this.passwordFormControl.value,
  //     this.confirmPasswordFormControl.value
  //   );
  //   RegistrationValidator.validate.bind(this);
  // }
  // get email() {
  //   return this.emailFormControl.get("email");
  // }
  // get password() {
  //   return this.passwordsForm.get("password");
  // }
  // get confirmPassword() {
  //   return this.passwordsForm.get("confirmPassword");
  // }

  // emailFormControl = new FormControl("", [
  //   Validators.required,
  //   Validators.email
  // ]);
  // passwordForm = new FormControl("", [
  //   Validators.required,
  //   Validators.minLength(6)
  // ]);

  // passwordConfirmForm = new FormControl("", [
  //   Validators.required,
  //   Validators.minLength(6)
  // ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {}
  // convenience getter for easy access to form fields
  // get f() {
  //   return this.registerForm.controls;
  // }

  // get p() {
  //   return this.passwordsForm.controls;
  // }

  // checkPasswords(group: FormGroup): void {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.repeatPassword.value;
  //   return  of(pass === confirmPass).pipe(result => result ? { invalid: true } : null)
  //   // here we have the 'passwords' group

  // }

  registration() {
    console.log(
      "forms",
      this.passwordFormControl.value,
      this.confirmPasswordFormControl.value
    );
    //   this.loading = true;
    //   console.log("this.registerForm", this.registerForm);
    //   if (this.registerForm.invalid) {
    //     return;
    //   }
    //   this.authenticationService
    //     .signUp({
    //       login: this.registerForm.controls.email.value,
    //       password: this.registerForm.controls.passwordsForm.controls.password
    //         .value
    //     } as User)
    //     .subscribe(
    //       data => {
    //         if (localStorage.getItem("currentUser"))
    //           this.router.navigate(["/boards"]);
    //       },
    //       error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //       }
    //     );
  }
}
