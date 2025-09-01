import { Domain } from 'src/common/decorators/module/domain/domain.decorator';
import { User } from '../entities/user.entity';
import { UserCrudModule } from '../../crud/user-crud.module';
import { UserBaseModule } from 'src/shared/user-base/user-base.module';
import { UserAuthService } from './user-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Domain({
  entities: [User],
  imports: [
    UserCrudModule,
    UserBaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  services: [UserAuthService],
})
export class UserAuthDomain {}
