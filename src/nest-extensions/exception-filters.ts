import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestBodyValidationException } from './exceptions';

@Catch(RequestBodyValidationException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: RequestBodyValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = 400;

    const details: Array<string> = [];

    for (const e of exception.errors) {
      for (const m of Object.values(e.constraints)) {
        const message: string = `in ${exception.prefix}: ${m}`;
        details.push(message);
      }
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      details: details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
