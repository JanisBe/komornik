import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const userId = this.route.snapshot.queryParams['userId'];
    if (!token || !userId) {
      this.snackbarService.displayError('Niepoprawny link aktywacji');
      this.router.navigate(['/login']);
    }
    this.userService.verifyUser(token, userId).subscribe({
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
