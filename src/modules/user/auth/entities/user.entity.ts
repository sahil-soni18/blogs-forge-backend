import { BaseEntity } from 'src/common/entities/base.entity';
import { Role } from 'src/modules/blogs/domain/dtos/CreateBlog.dto';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @Column({ type: 'enum', enum: Role, default: Role.USER})
  role: Role;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
