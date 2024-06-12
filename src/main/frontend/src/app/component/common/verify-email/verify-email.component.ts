import {Component, Input} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  standalone: true
})
export class VerifyEmailComponent {

  @Input() token: string;
  @Input() userId: string;

  constructor(private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (!this.token || !this.userId) {
      this.snackbarService.displayError('Niepoprawny link aktywacji');
      this.router.navigate(['/login']);
    }
    this.userService.verifyUser(this.token, this.userId).subscribe({
      next: (response) => {
        const user = response.body!;
        this.snackbarService.displayMessage('Konto zostało aktywowane, witamy!.', 5000)
        this.authService.storeUser(user);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackbarService.displayError(err.error.message);
      }
    });
  }
}
