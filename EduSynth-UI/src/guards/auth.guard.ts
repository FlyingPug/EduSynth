import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";

export const AuthGuard: CanMatchFn = (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    function checkAuth() : boolean {
        if (authService.isAuthorized) {
            return true;
        }

        console.log("redirecting to login");
        router.navigate(["/auth/login"]);
        return false;
    }

    return checkAuth();
};
