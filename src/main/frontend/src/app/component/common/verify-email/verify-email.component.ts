import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const userId = this.route.snapshot.queryParams['userId'];
    console.log("here1")
    if (!token || !userId) {
      this.snackbarService.displayError('Niepoprawny link aktywacji');
      console.log("here2")
      this.router.navigate(['/login']);
    }
    this.userService.verifyUser(token, userId).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.displayMessage('Konto zostało aktywowane, witamy!.');
        this.authService.login(this.route.snapshot.queryParams['email'], this.route.snapshot.queryParams['password']);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.snackbarService.displayError("Wystąpił błąd");
      }
    });
  }
}
