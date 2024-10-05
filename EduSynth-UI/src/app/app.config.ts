import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import  { initializeAppFactory } from './app.initializer';
import { AuthService } from '../service/auth.service';
import { RxStompService } from '../service/rx-stomp-service';
import { rxStompServiceFactory } from '../factory/rxStompServiceFactory';
import { SessionService } from '../service/session.service';
import { authInterceptor } from '../interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
    providers: [SessionService, provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync(), {
        provide: APP_INITIALIZER,
        useFactory: initializeAppFactory,
        multi: true,
        deps: [AuthService],
    },
    {
        provide: RxStompService,
        useFactory: rxStompServiceFactory,
    }
    ]
};
