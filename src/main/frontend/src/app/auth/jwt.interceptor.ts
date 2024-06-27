import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../service/loading.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);
    this.totalRequests++;
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      }),
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              console.log('redirect');
              // this.authService.logout();
              // this.router.navigate(['login']);
            }
          }
        }
      }));
  }
}
