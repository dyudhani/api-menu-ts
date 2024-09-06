import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { MenuNotFound } from 'src/usecases/menu/menu.uc.errors';
import { ErrorHandler } from '../error-handler';

export class MenuErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {
    if (error instanceof MenuNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    throw error;
  }
}
