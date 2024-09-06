import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCOrder } from 'src/usecases/order/order.uc.main';
import {
  ResponseBodyDTO_CreateOrder,
  ResponseBodyDTO_Order,
} from './order.dto';
import { QueryParam_Order } from './order.query.params';

@Controller('orders')
@UseInterceptors(ErrorInterceptor)
export class OrderController {
  constructor(private ucOrder: UCOrder) {}

  @Get()
  async listOrder(
    @Query() query: QueryParam_Order,
    @Res() response,
  ): Promise<ResponseBodyDTO_Order[]> {
    const listOrder = await this.ucOrder.listOrder(query);

    return response.json({
      status: 201,
      data: listOrder,
    });
  }

  @Get(':id')
  async getOrderById(
    @Req() req,
    @Res() response,
  ): Promise<ResponseBodyDTO_Order> {
    const { id } = req.params;

    const data = await this.ucOrder.getOrderById(id);

    return response.json({
      status: 201,
      data,
    });
  }

  @Post()
  async createOrder(
    @Req() req,
    @Res() response,
    @Body() body: ResponseBodyDTO_CreateOrder,
  ): Promise<ResponseBodyDTO_CreateOrder> {
    const { menuId, toppingId, fillingId, customerName, quantity } = body;

    const data = await this.ucOrder.createOrder(
      menuId,
      customerName,
      quantity,
      toppingId,
      fillingId,
    );

    return response.json({
      status: 201,
      message: 'Order created successfully',
      data,
    });
  }

  @Put(':id')
  async updateOrder(
    @Req() req,
    @Res() response,
    @Body() body: ResponseBodyDTO_CreateOrder,
  ): Promise<ResponseBodyDTO_CreateOrder> {
    const { id } = req.params;
    const { menuId, toppingId, fillingId, customerName, quantity } = body;

    const data = await this.ucOrder.updateOrder(
      id,
      menuId,
      customerName,
      quantity,
      toppingId,
      fillingId,
    );

    return response.json({
      status: 201,
      message: 'Order updated successfully',
      data,
    });
  }
}
