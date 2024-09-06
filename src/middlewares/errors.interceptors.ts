import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, from, throwError } from 'rxjs';

import { ErrorHandler } from '../apps/error-handler';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return from(
      next
        .handle()
        .toPromise()
        .catch((error) => this.errorHandler.handle(context, error)),
    ).pipe(catchError((err) => throwError(() => err)));
  }
}
