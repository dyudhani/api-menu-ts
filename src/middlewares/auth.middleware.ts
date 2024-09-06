import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'src/configs';
import { JWTPayload } from 'src/nest-extensions/express';
import { RepAuth } from 'src/services/repositories/rep.auth';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private repAuth: RepAuth) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('no token provided');
      }

      const decoded = verify(token, config.JWT_SECRET_KEY) as JWTPayload;

      let userId: string;

      switch (true) {
        case decoded.aud.includes('cashier-auth'):
          userId = decoded.sub;
          req.cashier = await this.repAuth.findCashier(userId);
          if (!req.cashier) {
            throw new UnauthorizedException("token owner's not found");
          }

          break;
        default:
          throw new Error();
      }

      req.jwtPayload = decoded;
      next();
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('token expired');
      } else if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException('invalid token');
      }
    }
  }
}
