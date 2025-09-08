import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('skills')
export class Skills {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({})
  profile_id!: number;

  @Column({})
  skill!: string;

  @ManyToOne(() => Profile, (profile) => profile.skills)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
