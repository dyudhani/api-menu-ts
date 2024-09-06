import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCTopping } from 'src/usecases/topping/topping.uc.main';
import { ResponseBodyDTO_Topping } from './topping.dto';
import { QueryParam_Topping } from './topping.query.params';

@Controller('toppings')
@UseInterceptors(ErrorInterceptor)
export class ToppingController {
  constructor(private ucTopping: UCTopping) {}

  @Get(':id')
  async getTopping(
    @Param('id') id: string,
    @Res() response,
  ): Promise<ResponseBodyDTO_Topping> {
    const data = await this.ucTopping.getTopping(id);

    return response.json({
      status: 201,
      data,
    });
  }

  @Get()
  async listTopping(
    @Query() query: QueryParam_Topping,
    @Res() response,
  ): Promise<ResponseBodyDTO_Topping[]> {
    const listTopping = await this.ucTopping.listTopping(query);

    return response.json({
      status: 201,
      data: listTopping,
    });
  }
}
