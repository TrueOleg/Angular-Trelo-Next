import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  registerForm: any;
  passwordsForm: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.passwordsForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: RegistrationValidator.validate.bind(this)
      }
    );
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      passwordsForm: this.passwordsForm
      // password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  get p() {
    return this.passwordsForm.controls;
  }

  // checkPasswords(group: FormGroup): void {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.repeatPassword.value;
  //   return  of(pass === confirmPass).pipe(result => result ? { invalid: true } : null)
  //   // here we have the 'passwords' group

  // }

  registration() {
    this.loading = true;

    console.log("this.registerForm", this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    this.authenticationService
      .signUp({
        login: this.registerForm.controls.email.value,
        password: this.registerForm.controls.passwordsForm.controls.password
          .value
      } as User)
      .subscribe(
        data => {
          if (localStorage.getItem("currentUser"))
            this.router.navigate(["/boards"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
