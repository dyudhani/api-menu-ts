import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import {
  OrderNotFound,
  QueryNotFound,
} from 'src/usecases/order/order.uc.error';
import { ErrorHandler } from '../error-handler';

export class OrderErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {
    if (error instanceof OrderNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    if (error instanceof QueryNotFound) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

    throw error;
  }
}
