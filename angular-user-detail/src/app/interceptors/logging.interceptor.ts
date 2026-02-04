import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  console.log(`[HTTP Request] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type !== 0) {
          const duration = Date.now() - startTime;
          console.log(`[HTTP Response] ${req.url} completed in ${duration}ms`);
        }
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.error(
          `[HTTP Error] ${req.url} failed after ${duration}ms:`,
          error.message
        );
      },
    })
  );
};
