import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../model/user";
import {SnackbarService} from "../service/snackbar.service";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private snackbarService: SnackbarService) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<User>(
        `${environment.API_URL}/auth/authenticate`,
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          return this.handleAuth(resData.mail, resData.name, resData.id, resData.token!);
        })
      );
  }

  login(email: string, password: string) {
    console.log(environment.API_URL)
    return this.http.post<User>(
      `${environment.API_URL}/auth/authenticate`,
      {
        username: email,
        password: password,
      }
    )
      .subscribe({
        next: (resData) => {
          return this.handleAuth(resData.mail, resData.name, resData.id, resData.token!);
        },
        error: error => {
          this.handleError(error);
          console.log(error);
          this.snackbarService.displayMessage(error.error.message);
        }
      });
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData: {
      mail: string;
      id: number;
      token: string;
      name: string
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser: User = {
      id: userData.id,
      mail: userData.mail,
      token: userData.token,
      name: userData.name
    };
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  addUser(user: User) {
    console.log(user);
    this.handleAuth(user.mail, user.name, user.id, user.token!);
  }

  isLoggedIn(): boolean {
    return this.user.value != null;
  }

  private handleAuth(
    email: string,
    name: string,
    userId: number,
    token: string
  ) {
    const user: User = {name: name, id: userId, token: token, mail: email}
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/group/list']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.code) {
      case 500:
        errorMessage = 'Zły login / hasło';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }

  storeUser(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }
}
