import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestBodyValidationException } from './exceptions';

export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const groups: Array<string> = [];

    const errorPrefix: string = metatype.name.split('_', 2)[0];

    const object = plainToInstance(metatype, value, { groups });
    const errors = await validate(object, { groups });
    if (errors.length > 0) {
      throw new RequestBodyValidationException(errorPrefix, errors);
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
