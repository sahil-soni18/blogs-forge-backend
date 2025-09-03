import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

Entity('education');
export class Education {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({})
  profile_id!: number;

  @Column({})
  institution_name!: string;

  @Column({})
  degree!: string;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @ManyToOne(() => Profile, (profile) => profile.education)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
