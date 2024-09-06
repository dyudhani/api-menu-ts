import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UserAlreadyExist } from 'src/usecases/auth/auth.uc.errors';
import { ErrorHandler } from '../error-handler';

export class AuthErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {
    if (error instanceof UserAlreadyExist) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }

    throw error;
  }
}
