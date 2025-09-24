import { User } from 'src/modules/user/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ name: 'author_id', type: 'int' })
  authorId!: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', array: true, nullable: true })
  technologies?: string[];

  @Column({ type: 'int', default: 5 })
  read_time: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => User, (user) => user.blogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author!: User;
}
