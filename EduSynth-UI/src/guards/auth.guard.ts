import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";

export const AuthGuard: CanMatchFn = async () => {
    const router = inject(Router);

    if (AuthService.isAuthorized()) {
        return true;
    }

    await router.navigate(["/auth/login"]);
    return false;

};
