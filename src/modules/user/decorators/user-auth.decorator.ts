import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserGuard } from '../guards/user-guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function UserAuth() {
  return applyDecorators(
    UseGuards(UserGuard),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({
      description: 'Unauthorized: Invalid or missing user token',
    }),
  );
}
