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

import { AlertService } from "../service/alert-service.service";

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(
//       control &&
//       control.invalid &&
//       (control.dirty || control.touched || isSubmitted)
//     );
//   }
// }

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    // this.loginForm = this.formBuilder.group({
    //   email: ["", [Validators.required, Validators.email]],
    //   password: ["", [Validators.required, Validators.minLength(6)]]
    // });
  }

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  // get f() {
  //   return this.loginForm.controls;
  // }

  // getErrorMessage() {
  //   return this.loginForm.hasError("required")
  //     ? "You must enter a value"
  //     : this.loginForm.hasError("email")
  //       ? "Not a valid email"
  //       : "";
  // }

  login() {
    this.loading = true;

    console.log("this.email", this.emailFormControl.value);
    console.log("this.password", this.passwordFormControl.value);
    if (this.emailFormControl.invalid || this.passwordFormControl) {
      return;
    }
    this.authenticationService
      .signIn(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(
        () => {
          if (localStorage.getItem("currentUser"))
            this.router.navigate(["/boards"]);
        },
        error => {
          console.log("error", error);
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
