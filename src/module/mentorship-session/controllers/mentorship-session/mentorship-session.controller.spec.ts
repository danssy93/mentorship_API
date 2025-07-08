import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipSessionController } from './mentorship-session.controller';

describe('MentorshipSessionController', () => {
  let controller: MentorshipSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorshipSessionController],
    }).compile();

    controller = module.get<MentorshipSessionController>(MentorshipSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
