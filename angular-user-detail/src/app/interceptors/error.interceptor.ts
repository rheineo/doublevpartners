import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please check your credentials.';
            break;
          case 403:
            errorMessage = 'API rate limit exceeded. Please try again later.';
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error: ${error.status} - ${error.statusText}`;
        }
      }

      console.error('[Error Interceptor]', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
