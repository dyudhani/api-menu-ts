import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCFilling } from 'src/usecases/filling/filling.uc.main';
import { ResponseBodyDTO_Filling } from './filling.dto';
import { QueryParam_Filling } from './filling.query.params';

@Controller('fillings')
@UseInterceptors(ErrorInterceptor)
export class FillingController {
  constructor(private ucFilling: UCFilling) {}

  @Get(':id')
  async getFilling(
    @Param('id') id: string,
    @Res() response,
  ): Promise<ResponseBodyDTO_Filling> {
    const data = await this.ucFilling.getFilling(id);

    return response.json({
      status: 201,
      data,
    });
  }

  @Get()
  async listFilling(
    @Query() query: QueryParam_Filling,
    @Res() response,
  ): Promise<ResponseBodyDTO_Filling[]> {
    const listFilling = await this.ucFilling.listFilling(query);

    return response.json({
      status: 201,
      data: listFilling,
    });
  }
}
