import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipSessionService } from './mentorship-session.service';

describe('MentorshipSessionService', () => {
  let service: MentorshipSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorshipSessionService],
    }).compile();

    service = module.get<MentorshipSessionService>(MentorshipSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
