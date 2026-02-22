import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (process.env.PROTECTION_ACTIVE !== 'true') {
      console.log(
        'Protection is disabled, allowing access without token, for testing purposes, cant use user data on request',
      );
      request.user = {
        id: '75eea8d3-53ec-4a1f-b8c1-a2bc8b37bd08',
        email: 'test@gmail.com',
      };
      return true;
    }

    const authHeader = request.headers['authorization'] as string;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const splitHeader = authHeader.split(' ');
    const token = splitHeader[1]; // Extract token

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      request.user = decoded;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
