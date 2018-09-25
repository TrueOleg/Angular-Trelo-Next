import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  login() {
    this.loading = true;
    this.authenticationService
      .signIn(this.model.email, this.model.password)
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
