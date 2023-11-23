import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { OPTIONAL_GUARD } from '@src/decorator';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const optional = this.reflector.getAllAndOverride<boolean>(OPTIONAL_GUARD, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (optional && !user) {
      return null;
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
