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
import { MyErrorStateMatcher } from '../_helpers/my-error-state-matcher';

import { AlertService } from '../service/alert-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    (this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ])),
      (this.passwordFormControl = new FormControl('', [Validators.required]));
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  login() {
    this.loading = true;

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.authenticationService
      .signIn(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(
        () => {
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
