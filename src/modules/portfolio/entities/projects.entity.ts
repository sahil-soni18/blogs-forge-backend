import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('projects')
export class Projects {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({})
  profile_id!: number;

  @Column({})
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  techStack: string[];

  @Column({ nullable: true })
  project_image_url: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  live_url: string;

  @ManyToOne(() => Profile, (profile) => profile.projects)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
