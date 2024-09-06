import { Injectable, Module } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/configs';
import { PersistedEntity } from 'src/domains/entities/base';
import { AccessToken, User } from 'src/domains/entities/user';
import { RepAuth } from 'src/services/repositories/rep.auth';
import { ServicesModule } from 'src/services/services.module';
import { generateRandomString } from 'src/utils/random-string';
import { signJWT } from 'src/utils/token';
import { UserNotFound } from './auth.uc.errors';

@Injectable()
export class UCAuth {
  constructor(private repAuth: RepAuth) {}

  async login(
    email: string,
    password: string,
  ): Promise<User | AccessToken | PersistedEntity | any> {
    const user = await this.repAuth.findUserByEmail(email);
    if (!user) {
      throw new UserNotFound('User not found');
    }

    const userLogin = await this.repAuth.login(email, password);
    if (!userLogin) {
      throw new Error('Failed to login');
    }

    const signed = signJWT(
      config.JWT_SECRET_KEY,
      { sub: userLogin[0].id },
      '1h',
      ['cashier-auth'],
    );
    const signToTakeExpiresAt = signJWT(
      config.JWT_SECRET_KEY,
      { sub: userLogin[0].id },
      '2h',
      ['cashier-auth'],
    );

    const idTokenData = jwt.decode(signed);
    const tokenToTakeExpiresData = jwt.decode(signToTakeExpiresAt);

    const accessToken = generateRandomString(100);
    const refreshToken = generateRandomString(100);

    const accessTokenRecord = await this.repAuth.createAccess(
      accessToken,
      userLogin[0].email,
      idTokenData,
    );
    if (!accessTokenRecord || accessTokenRecord.id === null) {
      throw new Error('Failed to create access token record');
    }

    const refrestTokenRecord = await this.repAuth.createRefresh(
      refreshToken,
      accessTokenRecord[0].id,
      tokenToTakeExpiresData,
    );

    if (!refrestTokenRecord) {
      throw new Error('Failed to create refresh token');
    }

    user.authAudience = ['cashier-auth'];
    return {
      email: userLogin[0].email,
      access_token: accessToken,
      refresh_token: refreshToken,
      token: signed,
      iat: (idTokenData as jwt.JwtPayload).iat,
      exp: (idTokenData as jwt.JwtPayload).exp,
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<any> {
    const newUser = await this.repAuth.register(
      email,
      password,
      firstName,
      lastName,
    );
    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCAuth],
  exports: [UCAuth],
})
export class UCAuthModule {}
