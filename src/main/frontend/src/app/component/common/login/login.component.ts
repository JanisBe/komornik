import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    if (!!this.authService.user.value) {
      // this.router.navigate(['/group/list']);
    }
    this.initForm();
    if (this.route.snapshot.queryParams['email']) {
      this.loginForm.patchValue({login: this.route.snapshot.queryParams['email']})
    }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password);
  }

  private initForm() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  forgotPass() {
    this.router.navigate(['/forgot-password'], {queryParams: {login: this.loginForm.value.login}});
  }
}
