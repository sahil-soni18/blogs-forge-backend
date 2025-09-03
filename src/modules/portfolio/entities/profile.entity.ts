import { User } from 'src/modules/user/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projects } from './projects.entity';
import { Experience } from './experience.entity';
import { Skills } from './skills.entity';
import { Education } from './education.entity';

Entity('profile');
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({})
  user_id!: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ name: 'profile_image_url', nullable: true })
  profile_image_url: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Projects, (projects) => projects.profile, { cascade: true })
  projects: Projects;

  @OneToMany(() => Experience, (experience) => experience.profile, {
    cascade: true,
  })
  experience: Experience;

  @OneToMany(() => Skills, (skill) => skill.profile, { cascade: true })
  skills: Skills;

  @OneToMany(() => Education, (education) => education.profile, {
    cascade: true,
  })
  education: Education;
}
