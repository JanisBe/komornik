import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password)
  }

  private initForm() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  forgotPass() {

  }
}
