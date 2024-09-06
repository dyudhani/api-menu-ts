import { ValidationError } from 'class-validator';

export class RequestBodyValidationException extends Error {
  constructor(
    public prefix: string,
    public errors: Array<ValidationError>,
  ) {
    const message = `in ${prefix}: ${errors[0].constraints[Object.keys(errors[0].constraints)[0]]}`;

    super(message);
  }
}
