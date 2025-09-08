import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCrudService } from '../crud/user-crud.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../auth/entities/user.entity';

const bypassTokenEmail = ['Sahils1810@gmail.com'];

interface JwtPayload {
  id: number;
  email: string;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly userService: UserCrudService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user?: User }>();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('You are not logged in!');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      console.log('Decoded JWT:', JSON.stringify(decoded));

      if (bypassTokenEmail.includes(decoded.email)) {
        const currentUser: User | null = await this.userService.findOne({
          where: { email: decoded.email },
        });
        req.user = currentUser!;
        return true;
      }

      const currentUser: User | null = await this.userService.findOne({
        where: { id: decoded.id },
        cache: { id: `user_${decoded.id}`, milliseconds: 1000 * 60 * 1 },
      });

      if (!currentUser) {
        throw new UnauthorizedException(
          'The User belonging to this token no longer exists!',
        );
      }

      console.log(`CurrentUser: ${JSON.stringify(currentUser)}`);
      if (currentUser.token !== token) {
        throw new UnauthorizedException('This token is expired!');
      }

      req.user = currentUser;
      return true;
    } catch {
      throw new UnauthorizedException('You are not logged in!');
    }
  }
}
