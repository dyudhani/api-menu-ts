import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles, RolesGuard } from 'src/middlewares/auth.guard.middleware';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCMenu } from 'src/usecases/menu/menu.uc.main';
import {
  RequestBodyDTO_CreateMenu,
  RequestBodyDTO_UpdateMenu,
  ResponseBodyDTO_Menu,
} from './menu.dto';

@Controller('menus')
@UseInterceptors(ErrorInterceptor)
export class MenuController {
  constructor(private ucMenu: UCMenu) {}

  @Get()
  async listMenu(@Res() response): Promise<ResponseBodyDTO_Menu[]> {
    const data = await this.ucMenu.listMenu();

    return response.json({
      status: 200,
      message: 'Successfull get all menu',
      data,
    });
  }

  @Get(':id')
  async getMenu(
    @Param('id') id: string,
    @Res() response,
  ): Promise<ResponseBodyDTO_Menu> {
    const data = await this.ucMenu.getMenu(id);

    return response.json({
      status: 200,
      message: 'Successfull get menu by id',
      data,
    });
  }

  @Post('admin/create')
  @Roles(['cashier'])
  @UseGuards(RolesGuard)
  async createMenu(
    @Req() req: Request,
    @Res() response,
    @Body() body: RequestBodyDTO_CreateMenu,
  ) {
    const { name, price, stock, description } = body;

    const data = await this.ucMenu.createMenu(req.cashier, {
      name,
      price,
      stock,
      description,
    });

    return response.json({
      status: 201,
      message: 'Menu created successfully',
      data,
    });
  }

  @Put('/admin/create/:id')
  @Roles(['cashier'])
  @UseGuards(RolesGuard)
  async updateMenu(
    @Param('id') id: string,
    @Res() response,
    @Body() body: RequestBodyDTO_UpdateMenu,
  ) {
    const { name, price, stock, description } = body;

    const data = await this.ucMenu.updateMenu(
      id,
      name,
      price,
      stock,
      description,
    );

    return response.json({
      status: 200,
      message: 'Menu updated successfully',
      data,
    });
  }
}
