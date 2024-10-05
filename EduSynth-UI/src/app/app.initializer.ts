import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

export function initializeAppFactory(authService: AuthService) {
    return () => new Promise<void>(resolve => {
        authService.tryRetrieveAccessToken().subscribe().add(resolve());
    });
}
