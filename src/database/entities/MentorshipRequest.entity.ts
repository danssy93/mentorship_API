import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class MentorshipRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  mentee: User;

  @ManyToOne(() => User, { eager: true })
  mentor: User;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';

  @CreateDateColumn()
  createdAt: Date;
}
