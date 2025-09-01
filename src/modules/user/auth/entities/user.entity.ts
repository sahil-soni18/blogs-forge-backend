import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 250, nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  email!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  token: string;
}
