import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  short_bio: string;

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  goals: string[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
