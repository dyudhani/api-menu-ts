import { IsOptional, IsString } from 'class-validator';

export class QueryParam_Filling {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  menu_id: string;
}
