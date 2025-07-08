import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Feedback } from './Feedback.entity';
import { User } from './User.entity';

// src/database/entities/mentorship-session.entity.ts
@Entity()
export class MentorshipSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduledAt: Date;

  @Column({ nullable: true })
  durationMinutes: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  feedbackFromMentor: string;

  @Column({ nullable: true })
  feedbackFromMentee: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.session)
  feedbacks: Feedback[];

  @ManyToOne(() => User, (user) => user.mentorshipSessionsAsMentor, {
    eager: false,
  })
  mentor: User;

  @ManyToOne(() => User, (user) => user.mentorshipSessionsAsMentee, {
    eager: false,
  })
  mentee: User;
}
