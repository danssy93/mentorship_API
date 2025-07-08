import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MentorshipSessionService } from './services/mentorship-session/mentorship-session.service';

@Module({
  imports: [DatabaseModule], // ✅ so this module can use the repository
  providers: [MentorshipSessionService],
})
export class MentorshipSessionModule {}
