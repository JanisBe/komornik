import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../../service/snackbar.service";
import {UserService} from "../../../service/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userForm: FormGroup;
  changePassword: false;

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
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
    if (this.route.snapshot.queryParams['login']) {
      this.userForm.patchValue({userName: this.route.snapshot.queryParams['login']})
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
