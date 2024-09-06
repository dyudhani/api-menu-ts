import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq, gte } from 'drizzle-orm';
import { JwtPayload } from 'jsonwebtoken';
import { PersistedEntity } from 'src/domains/entities/base';
import { Cashier } from 'src/domains/entities/cashier';
import { User } from 'src/domains/entities/user';
import { PersistedAuth, RepAuth } from 'src/services/repositories/rep.auth';
import { comparePlainAndEncrypt } from 'src/utils/crypto';
import { generateRandomString } from 'src/utils/random-string';
import { cashiers } from '../db/schema/cashier';
import { accessTokens, refreshTokens, users } from '../db/schema/user';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGAuth extends RepPG implements RepAuth {
  persist(): Promise<PersistedAuth> {
    throw new Error('Method not implemented.');
  }

  async getUserByToken(token: string): Promise<User> {
    const results = await this.getDBContext()
      .select()
      .from(accessTokens)
      .where(
        and(
          eq(accessTokens.id, token),
          gte(accessTokens.expiresAt, new Date()),
        ),
      )
      .leftJoin(users, eq(accessTokens.sub, users.email))
      .limit(1);

    if (!results.length) return null;

    const user = new User({
      id: results[0].users.id,
      email: results[0].users.email,
      password: results[0].users.password,
      createdAt: results[0].users.createdAt,
      updatedAt: results[0].users.updatedAt,
    });

    const persistedUser: User & PersistedEntity = {
      ...user,
      id: results[0].users.id,
      createdAt: results[0].users.createdAt,
      updatedAt: results[0].users.updatedAt,
    };

    return persistedUser;
  }

  async findUserByEmail(email: string): Promise<User & PersistedEntity> {
    try {
      const _user = await this.getDBContext()
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!_user.length) return null;

      return { ..._user[0], authAudience: [] };
    } catch (error) {
      throw error;
    }
  }

  async findCashier(userId: string): Promise<Cashier & PersistedEntity> {
    const results = await this.getDBContext()
      .select()
      .from(cashiers)
      .where(eq(cashiers.userId, userId))
      .leftJoin(users, eq(cashiers.userId, users.id))
      .limit(1);

    if (!results.length) return null;

    const cashier = new Cashier({
      id: results[0].cashiers.id,
      email: results[0].users.email,
      password: results[0].users.password,
      userId: results[0].cashiers.userId,
      firstName: results[0].cashiers.firstName,
      lastName: results[0].cashiers.lastName,
      createdAt: results[0].cashiers.createdAt,
      updatedAt: results[0].cashiers.updatedAt,
    });

    const persistedCashier: Cashier & PersistedEntity = {
      ...cashier,
      id: results[0].cashiers.id,
      createdAt: results[0].cashiers.createdAt,
      updatedAt: results[0].cashiers.updatedAt,
    };

    return persistedCashier;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.getDBContext()
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await comparePlainAndEncrypt(password, user[0].password);
      if (!isMatch) {
        throw new HttpException(
          'Invalid email and password',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<any> {
    try {
      const userExist = await this.getDBContext()
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (userExist.length > 0) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const newUser = {
        id: generateRandomString(10),
        email,
        password,
      };

      const user = await this.getDBContext()
        .insert(users)
        .values(newUser)
        .returning();

      if (!user) {
        throw new HttpException(
          'Failed to create user',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newCashier = {
        id: generateRandomString(10),
        userId: user[0].id,
        firstName,
        lastName,
        createdAt: new Date(),
      };

      const cashier = await this.getDBContext()
        .insert(cashiers)
        .values(newCashier)
        .returning();

      if (!cashier) {
        throw new HttpException(
          'Failed to create cashier',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        ...user[0],
        ...cashier[0],
      };
    } catch (error) {
      throw error;
    }
  }

  async createAccess(
    accessToken: string,
    userSub: string,
    idToken: any,
  ): Promise<any> {
    try {
      const newAccess = {
        id: accessToken,
        sub: userSub,
        createdAt: new Date((idToken as JwtPayload).iat * 1000),
        expiresAt: new Date((idToken as JwtPayload).exp * 1000),
      };
      const access = await this.getDBContext()
        .insert(accessTokens)
        .values(newAccess)
        .returning();

      return access;
    } catch (error) {
      throw error;
    }
  }

  async createRefresh(
    refreshToken: string,
    accessTokenId: string,
    tokenExpires: any,
  ): Promise<any> {
    try {
      const newRefresh = {
        id: refreshToken,
        accessTokenId: accessTokenId,
        createdAt: new Date((tokenExpires as JwtPayload).iat * 1000),
        expiresAt: new Date((tokenExpires as JwtPayload).exp * 1000),
      };

      const refresh = await this.getDBContext()
        .insert(refreshTokens)
        .values(newRefresh)
        .returning();

      return refresh;
    } catch (error) {
      throw error;
    }
  }
}
