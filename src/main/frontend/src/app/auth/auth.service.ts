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
        }, {withCredentials: true}
      )
      .pipe(
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
      }, {withCredentials: true}
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
    window.sessionStorage.clear();
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData: {
      mail: string;
      id: number;
      token: string;
      name: string
    } = JSON.parse(window.sessionStorage.getItem('userData') || '{}');
    const cookie = this.getCookie("accessToken");
    console.log(cookie);
    if (!userData) {
      return;
    }

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
    const xsrf = this.getCookie("XSRF-TOKEN");
    window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
    window.sessionStorage.setItem('userData', JSON.stringify(user));
    // cookie.setItem('userData', JSON.stringify(user));
    // localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/group/list']);
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
