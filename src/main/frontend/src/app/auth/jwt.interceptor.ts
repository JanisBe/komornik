import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    let httpHeaders = new HttpHeaders();
    // const account = this.authService.user.value;
    // const isLoggedIn = account?.token;
    // if (isLoggedIn) {
    //   httpHeaders = httpHeaders.append('Authorization', `Bearer ${account.token}`);
    // }

    // const xsrfHeader = window.sessionStorage.getItem('XSRF-TOKEN');
    // console.log(xsrfHeader);
    // if (xsrfHeader) {
    //   httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrfHeader);
    // }

    request = request.clone({
      headers: httpHeaders,
      withCredentials: true
    });

    return next.handle(request).pipe(tap({
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            console.log('redirect');
            this.authService.logout();
            this.router.navigate(['login']);
          }
        }
      }
    }));
  }
}
