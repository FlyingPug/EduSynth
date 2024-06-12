import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Перенаправляем на страницу входа
       // router.navigate(['/login']);
        return throwError(() => new Error('Неправильный логин или пароль!'));
      }
      console.log('Error detected');
      // Возвращаем ошибку, если необходимо обрабатывать её дальше
      return throwError(() => new Error('Unknown exception'));
    })
  );
};
