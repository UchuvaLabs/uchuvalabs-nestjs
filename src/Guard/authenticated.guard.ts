import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-api-key'] as string;
    

    if (!token) {
      throw new UnauthorizedException('Token or wallet not found');
    }

    const isValid = await this.userService.validateToken( token);

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
