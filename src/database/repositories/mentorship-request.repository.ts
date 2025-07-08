import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorshipRequest } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class MentorshipRequestRepository extends BaseRepository<MentorshipRequest> {
  constructor(
    @InjectRepository(MentorshipRequest)
    readonly repo: Repository<MentorshipRequest>,
  ) {
    super(repo);
  }
}
