import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module'; // ✅
import { MentorshipService } from './services/mentorship/mentorship.service';

@Module({
  imports: [DatabaseModule], // ✅ this brings in the exported repositories
  providers: [MentorshipService],
})
export class MentorshipModule {}
