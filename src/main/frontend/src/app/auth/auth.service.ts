import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, tap, throwError} from "rxjs";
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
        tap(resData => {
          return this.handleAuth(resData.mail, resData.name, resData.id, resData.token!);
        })
      );
  }

  login(email: string, password: string) {
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
        }
      });
  }

  logout() {
    // localStorage.removeItem('userData');
    window.sessionStorage.removeItem('userData');
    this.user.next(null);
    this.snackbarService.displayMessage('Wylogowano!', 3000);
    this.http.post(`${environment.API_URL}/logout`, {}).subscribe();
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userDataFromStorage = window.sessionStorage.getItem('userData');
    if (!userDataFromStorage) {
      return;
    }
    const userData: {
      mail: string;
      id: number;
      token: string;
      name: string
    } = JSON.parse(userDataFromStorage);


    const loadedUser: User = {
      id: userData.id,
      mail: userData.mail,
      token: userData.token,
      name: userData.name
    };
    this.user.next(loadedUser);
    if (loadedUser.token) {
    }
  }

  addUser(user: User) {
    this.handleAuth(user.mail, user.name, user.id, user.token!);
  }

  isLoggedIn(): boolean {
    return this.user.value != null;
  }

  storeUser(user: User) {
    window.sessionStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.code) {
      case 500:
      case 403:
        errorMessage = 'Zły login / hasło';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    this.snackbarService.displayError(errorMessage);
    return throwError(() => errorMessage);
  }

  private handleAuth(email: string, name: string, userId: number, token: string) {
    const user: User = {name: name, id: userId, token: token, mail: email}
    this.user.next(user);
    window.sessionStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/group/list']);
  }

  public isHttpsEnabled() {
    return this.http.get<boolean>(`${environment.API_URL}/isHttpsEnabled`);
  }
}
