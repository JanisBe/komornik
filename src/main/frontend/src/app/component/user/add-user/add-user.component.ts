import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  private currentUser: User | null;
  inputActive = true;
  constructor(private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.user.value;
    this.initForm();
  }

  onSubmit() {
    this.inputActive = false;
    const user: User = this.userForm.value;
    this.userService.addUser(user).subscribe({
      next: (response) => {
        const newUser = response.body!;
        this.snackbarService.displayMessage(`Sukces, użytkownik ${newUser.name} zapisany, sprawdz email, aby aktywowć konto.`, 5000);
        if (!!this.currentUser) {
          this.authService.login(newUser.mail, newUser.password!);
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackbarService.displayError(`Nie udało się założyć użytkownika ${user.name}
        ${err.error.message}`);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private initForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }
}
