import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseBody_DTO_Auth {}

export class RequestBody_DTO_CreateUser {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
