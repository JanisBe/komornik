import {Component, Input, OnInit} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {UserService} from "../../../service/user.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../../model/user";
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatButton]
})
export class ForgotPasswordComponent implements OnInit {
  userForm: FormGroup;
  changePassword: false;
  @Input() login: string

  constructor(private snackbarService: SnackbarService,
              private userService: UserService,
              private router: Router) {
  }

  onSubmit() {
    const user: User = {
      id: 0,
      name: this.userForm.value.userName,
      mail: this.userForm.value.email
    }
    this.userService.forgotPassword(user).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.displayMessage(response.body!, 3000);
        this.router.navigate(['/login'], {queryParams: {email: this.userForm.value.email}});
      },
      error: (err) => {
        console.log(err.error);
        this.snackbarService.displayError(err.error);
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    if (!!this.login) {
      this.userForm.patchValue({userName: this.login})
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

  private initializeForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    })
  }

}
