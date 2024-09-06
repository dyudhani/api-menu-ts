import { IsOptional, IsString } from 'class-validator';

export class QueryParam_Search {
  @IsOptional()
  @IsString()
  s: string;
}
