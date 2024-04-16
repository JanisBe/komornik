import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton, RouterLink]
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
