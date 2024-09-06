import { ExecutionContext } from '@nestjs/common';

export abstract class ErrorHandler {
  abstract handle(context: ExecutionContext, error: Error);
}
