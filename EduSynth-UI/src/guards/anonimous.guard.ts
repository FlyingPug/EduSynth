import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";

export const AnonimousGuard: CanMatchFn = async () => {
    const router = inject(Router);

    if (!AuthService.isAuthorized()) {
        return true;
    }

    await router.navigate(["/"]);
    return false;
};
