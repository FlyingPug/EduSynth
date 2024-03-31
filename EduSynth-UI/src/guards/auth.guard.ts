import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const AuthGuard: CanMatchFn = (route, segments) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  function checkAuth() : boolean {
    console.log('checking')
    if (authService.isAuthorized) {
      return true;
    }

    console.log('redirecting to login')
    router.navigate(['/auth/login']);
    return false;
  }

  return checkAuth();
};
