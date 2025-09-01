import { Module } from '@nestjs/common';
import { UserAuthDomain } from '../services/user-auth.domain';
import { UserCrudModule } from '../../crud/user-crud.module';
import { UserAuthController } from './user-auth.controller';

@Module({
  imports: [UserAuthDomain, UserCrudModule],
  controllers: [UserAuthController],
})
export class UserControllerModule {}
