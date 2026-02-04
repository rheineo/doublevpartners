import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let userFriendlyMessage = 'Something went wrong';

      if (error.error instanceof ErrorEvent) {
        userFriendlyMessage = 'Please check your internet connection and try again.';
      } else {
        switch (error.status) {
          case 0:
            userFriendlyMessage = 'Unable to connect to the server. Please check your internet connection.';
            break;
          case 401:
            userFriendlyMessage = 'You are not authorized to view this content.';
            break;
          case 403:
            userFriendlyMessage = 'You have exceeded the API rate limit. Please wait a moment and try again.';
            break;
          case 404:
            userFriendlyMessage = 'The user you are looking for does not exist.';
            break;
          case 500:
            userFriendlyMessage = 'The server encountered an error. Please try again later.';
            break;
          case 503:
            userFriendlyMessage = 'The service is temporarily unavailable. Please try again later.';
            break;
          default:
            userFriendlyMessage = error.error?.message || 'An unexpected error occurred. Please try again.';
        }
      }

      console.error('[Followers Error Interceptor]', {
        status: error.status,
        message: userFriendlyMessage,
        url: req.url,
      });

      return throwError(() => new Error(userFriendlyMessage));
    })
  );
};
