import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import {
  QueryNotFound,
  ToppingNotFound,
} from 'src/usecases/topping/topping.uc.errors';
import { ErrorHandler } from '../error-handler';

export class ToppingErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {
    if (error instanceof ToppingNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    if (error instanceof QueryNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    throw error;
  }
}
