import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertService } from "../service/alert-service.service";

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
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  getErrorMessage() {
    return this.loginForm.hasError("required")
      ? "You must enter a value"
      : this.loginForm.hasError("email")
        ? "Not a valid email"
        : "";
  }

  login() {
    this.loading = true;

    console.log("this.loginForm", this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
      .signIn(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
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
