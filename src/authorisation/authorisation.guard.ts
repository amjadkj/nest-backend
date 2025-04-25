import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorisationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.token;
    // console.log(token);
    
    if (!token) {
      throw new ForbiddenException('Token not found');
    }
    try {
      const user = await this.jwtService.verifyAsync(token);
      req.user = user;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token ');
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedException('Not authorized to perform this action');
    }

    return true;
  }
}
