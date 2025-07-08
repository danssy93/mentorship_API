import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { MentorshipSession } from '../entities/MentorshipSession.entity';

@Injectable()
export class MentorshipSessionRepository extends BaseRepository<MentorshipSession> {
  protected readonly logger = new Logger(MentorshipSessionRepository.name);

  constructor(
    @InjectRepository(MentorshipSession)
    readonly mentorshipSessionRepo: Repository<MentorshipSession>, // ✅ renamed to avoid name conflict
  ) {
    super(mentorshipSessionRepo); // ✅ pass the actual injected repository
  }
}
