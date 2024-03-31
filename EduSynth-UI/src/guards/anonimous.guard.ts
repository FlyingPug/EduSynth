import {CanMatchFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";

export const AnonimousGuard: CanMatchFn = (route, segments) =>
{
  let authService = inject(AuthService);
  let router = inject(Router);

  function checkAuth() : boolean {
    console.log('checking');
    if (!authService.isAuthorized) {
      return true;
    }

    console.log('redirecting to home')
    router.navigate(['/']);
    return false;
  }

  return checkAuth();
};
