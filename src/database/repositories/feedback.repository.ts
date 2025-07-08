import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Feedback } from '../entities';

@Injectable()
export class FeedbackRepository extends BaseRepository<Feedback> {
  protected readonly logger = new Logger(Feedback.name);

  constructor(
    @InjectRepository(Feedback)
    readonly FeedbackRepository: Repository<Feedback>,
  ) {
    super(FeedbackRepository);
  }
}
