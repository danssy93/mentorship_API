import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from 'src/database/entities';
import {
  MentorshipRequestRepository,
  UserRepository,
} from 'src/database/repositories';

@Injectable()
export class MentorshipService {
  constructor(
    private readonly mentorshipRequestRepo: MentorshipRequestRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async requestMentorship(menteeId: number, mentorId: number) {
    const mentee = await this.userRepo.findOne({ id: menteeId });
    const mentor = await this.userRepo.findOne({ id: mentorId });

    if (!mentor || mentor.role !== UserRole.MENTOR) {
      throw new BadRequestException('Invalid mentor');
    }

    const existing = await this.mentorshipRequestRepo.findOne({
      mentor: { id: mentorId },
      mentee: { id: menteeId },
      status: 'PENDING',
    });

    if (existing) {
      throw new ConflictException('Request already pending');
    }

    const req = this.mentorshipRequestRepo.create({ mentor, mentee });
    return await this.mentorshipRequestRepo.save(await req); // ✅ use `await`
  }

  async respondToRequest(requestId: number, accept: boolean) {
    const request = await this.mentorshipRequestRepo.findOne({
      id: requestId,
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    request.status = accept ? 'ACCEPTED' : 'REJECTED';
    return this.mentorshipRequestRepo.save(request);
  }

  async getRequestsForMentor(mentorId: number) {
    return this.mentorshipRequestRepo.find({
      mentor: { id: mentorId },
    });
  }

  async getRequestsByMentee(menteeId: number) {
    return this.mentorshipRequestRepo.find({
      mentee: { id: menteeId },
    });
  }
}
