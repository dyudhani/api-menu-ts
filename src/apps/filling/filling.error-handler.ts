import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import {
  FillingNotFound,
  QueryNotFound,
} from 'src/usecases/filling/filling.uc.errors';
import { ErrorHandler } from '../error-handler';

export class FillingErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {
    if (error instanceof FillingNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    if (error instanceof QueryNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    throw error;
  }
}
