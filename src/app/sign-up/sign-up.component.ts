import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../auth.service";

import { User } from "../user";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  registration() {
    console.log("model", this.model);
    this.loading = true;
    this.authenticationService
      .signUp({
        login: this.model.email,
        password: this.model.password
      } as User)
      .subscribe(
        data => {
          if (localStorage.getItem("currentUser")) this.router.navigate([""]);
        }
        // error => {
        //   this.alertService.error(error);
        //   this.loading = false;
        // }
      );
  }
}
