import { IsOptional, IsString } from 'class-validator';

export class QueryParam_Order {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  menu_id: string;

  @IsOptional()
  @IsString()
  cashier_id: string;
}
