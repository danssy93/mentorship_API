import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './datasource';

import { MentorshipSession } from './entities/MentorshipSession.entity';
import { MentorshipRequest, User, Profile, Feedback } from './entities';

import { UserRepository } from './repositories/user.repository'; // Add other custom repositories as needed
import {
  MentorshipRequestRepository,
  MentorshipSessionRepository,
} from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const logger = new Logger('DatabaseModule');
        try {
          logger.log('Connected to the database');
          return dataSourceOptions;
        } catch (error) {
          logger.error('Database connection failed', error.stack);
          throw error;
        }
      },
    }),

    // ✅ Register entities for custom repositories
    TypeOrmModule.forFeature([
      MentorshipRequest,
      User,
      MentorshipSession,
      Profile,
      Feedback,
    ]),
  ],
  providers: [
    MentorshipRequestRepository,
    MentorshipSessionRepository,
    UserRepository,
    MentorshipSessionRepository,
  ],
  exports: [
    TypeOrmModule, // so other modules can use default @InjectRepository
    MentorshipRequestRepository,
    UserRepository,
    MentorshipSessionRepository,
  ],
})
export class DatabaseModule {}
