import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

export const Roles = Reflector.createDecorator<string[]>();

function matchRoles(expectedRoles: Array<string>, request: Request): boolean {
  if (
    expectedRoles.includes('cashier') &&
    request.cashier !== undefined &&
    request.cashier !== null
  ) {
    return true;
  }
  return false;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    return matchRoles(roles, request);
  }
}
