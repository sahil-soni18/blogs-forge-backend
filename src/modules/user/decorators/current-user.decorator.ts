import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) throw new NotFoundException('User not exists!!');
    return request.user as User;
  },
);
