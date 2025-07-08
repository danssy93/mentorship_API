import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentorshipSession } from './MentorshipSession.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => MentorshipSession, (session) => session.mentor)
  mentorshipSessionsAsMentor: MentorshipSession[];

  @OneToMany(() => MentorshipSession, (session) => session.mentee)
  mentorshipSessionsAsMentee: MentorshipSession[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.phone) {
      this.phone = this.phone.replace('+', '');
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  toPayload(): Partial<User> {
    return {
      id: this.id,
      phone: this.phone,
      email: this.email,
      created_at: this.created_at,
    };
  }
}
