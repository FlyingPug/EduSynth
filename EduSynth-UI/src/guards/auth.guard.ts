import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const AuthGuard: CanMatchFn = (route, segments) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  function checkAuth() : boolean {
    if (!authService.isAuthorized) {
      return true;
    }

    router.navigate(['/']);
    return false;
  }

  return checkAuth();
};
