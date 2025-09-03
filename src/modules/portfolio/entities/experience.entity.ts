import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({})
  profile_id!: number;

  @Column({ nullable: false })
  company_name!: string;

  @Column({})
  role!: string;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.experience)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
