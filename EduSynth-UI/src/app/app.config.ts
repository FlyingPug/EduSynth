import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter, RouteReuseStrategy} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import  {initializeAppFactory} from "./app.initializer"
import {AuthService} from "../service/auth.service";
import {CustomRouteReuseStrategy} from "../enviroment/router-reuse-strategy";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync(), {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    multi: true,
    deps: [AuthService],
  }
  ]
};
