import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MentorshipSession } from './MentorshipSession.entity'; // ✅ Correct import

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feedback: string;

  @ManyToOne(() => MentorshipSession, (session) => session.feedbacks)
  session: MentorshipSession; // ✅ Reference the actual entity
}
