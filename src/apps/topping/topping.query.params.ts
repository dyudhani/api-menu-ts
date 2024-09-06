import { IsOptional, IsString } from 'class-validator';

export class QueryParam_Topping {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  menu_id: string;
}
