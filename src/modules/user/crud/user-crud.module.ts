import { Domain } from 'src/common/decorators/module/domain/domain.decorator';
import { User } from '../auth/entities/user.entity';
import { UserCrudService } from './user-crud.service';

@Domain({
  entities: [User],
  services: [UserCrudService],
})
export class UserCrudModule {}
