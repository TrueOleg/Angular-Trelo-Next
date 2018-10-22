import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
// import { MyErrorStateMatcher } from "../_helpers/my-error-state-matcher";

import { Observable, of } from 'rxjs';

import { User } from '../user';
import { RegistrationValidator } from '../_helpers/registration-validator';
import { AlertService } from '../service/alert-service.service';

import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // model: any = {};
  loading = false;
  // returnUrl: string;
  // emailFormControl: any;
  // passwordsForm: any;
  myForm: FormGroup;
  emailFormControl: FormControl;
  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    (this.myForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['']
      },
      { validator: this.checkPasswords }
    )),
      (this.emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
      ]));
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {}

  registration() {
    this.loading = true;
    console.log('this.registerForm', this.myForm);
    if (this.myForm.invalid || this.emailFormControl.invalid) {
      console.log('aaaaaaaaaaaaaaaaaaa');
      return;
    }
    this.authenticationService
      .signUp({
        login: this.emailFormControl.value,
        password: this.myForm.controls.password.value
      } as User)
      .subscribe(
        data => {
          if (localStorage.getItem('currentUser'))
            this.router.navigate(['/boards']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
