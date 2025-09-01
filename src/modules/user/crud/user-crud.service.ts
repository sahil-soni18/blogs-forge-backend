import { Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserCrudService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByEmailId(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
