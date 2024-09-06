import { IsOptional, IsString } from 'class-validator';

export class QueryParam_Menu {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  price: string;
}
