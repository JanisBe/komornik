import {Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login');
};
