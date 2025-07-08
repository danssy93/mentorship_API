import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateSessionDto } from '../../dto/create-session.dto';
import { FeedbackDto } from '../../dto/feedback.dto';
import {
  MentorshipSessionRepository,
  UserRepository,
} from 'src/database/repositories';
import { UserRole } from 'src/database/entities';

@Injectable()
export class MentorshipSessionService {
  constructor(
    private readonly sessionRepo: MentorshipSessionRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async schedule(menteeId: number, dto: CreateSessionDto) {
    const mentee = await this.userRepo.findOne({ id: menteeId });
    const mentor = await this.userRepo.findOne({ id: dto.mentorId });

    if (!mentor || mentor.role !== UserRole.MENTOR) {
      throw new BadRequestException('Invalid mentor');
    }

    const session = this.sessionRepo.create({
      mentee,
      mentor,
      scheduledAt: new Date(dto.scheduledAt),
      durationMinutes: dto.durationMinutes,
    });

    return this.sessionRepo.save(await session);
  }

  async markCompleted(sessionId: number) {
    const session = await this.sessionRepo.findOne({ id: sessionId });
    if (!session) throw new NotFoundException('Session not found');
    session.completed = true;
    return this.sessionRepo.save(session);
  }

  async leaveFeedback(
    userId: number,
    sessionId: number,
    role: UserRole,
    dto: FeedbackDto,
  ) {
    const session = await this.sessionRepo.findOne({ id: sessionId });
    if (!session) throw new NotFoundException('Session not found');

    if (role === UserRole.MENTOR && session.mentor.id === userId) {
      session.feedbackFromMentor = dto.feedback;
    } else if (role === UserRole.MENTEE && session.mentee.id === userId) {
      session.feedbackFromMentee = dto.feedback;
    } else {
      throw new ForbiddenException(
        'You are not authorized to leave feedback for this session',
      );
    }

    return this.sessionRepo.save(session);
  }

  async getMySessions(userId: number, role: UserRole) {
    return this.sessionRepo.find({
      where:
        role === UserRole.MENTOR
          ? { mentor: { id: userId } }
          : { mentee: { id: userId } },
      order: { scheduledAt: 'DESC' },
    });
  }
}
