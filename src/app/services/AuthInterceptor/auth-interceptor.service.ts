import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  //interceptor dodający token JWT do zapytań wychodzących
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token: string = localStorage.getItem('token');
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          console.log('error 401 unauthorized');
        }
        const err = error.error.message || error.statusText;
        return throwError(error);
      })
    );
  }
}
