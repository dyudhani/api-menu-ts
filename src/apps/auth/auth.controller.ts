import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCAuth } from 'src/usecases/auth/auth.uc.main';
import { encryptPassword } from 'src/utils/crypto';
import { RequestBody_DTO_CreateUser } from './auth.dto';

@Controller('admin/auth')
@UseInterceptors(ErrorInterceptor)
export class AuthController {
  constructor(private ucAuth: UCAuth) {}

  @Post('login')
  async loginUser(
    @Res() response,
    @Body() body: RequestBody_DTO_CreateUser,
  ): Promise<RequestBody_DTO_CreateUser> {
    const user = await this.ucAuth.login(body.email, body.password);

    return response.json({
      statusCode: 200,
      message: 'Successfull Login User',
      results: user,
    });
  }

  @Post('register')
  async registerUser(
    @Res() response,
    @Body() body: RequestBody_DTO_CreateUser,
  ): Promise<RequestBody_DTO_CreateUser> {
    const password = await encryptPassword(body.password);
    const user = await this.ucAuth.register(
      body.email,
      password,
      body.firstName,
      body.lastName,
    );

    return response.json({
      statusCode: 201,
      message: 'Successfull Registration User',
      results: user,
    });
  }
}
