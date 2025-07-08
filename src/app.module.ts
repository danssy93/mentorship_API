import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { UsersModule } from './module/users/users.module';
import { MentorshipModule } from './module/mentorship/mentorship.module';
import { MentorshipSessionModule } from './module/mentorship-session/mentorship-session.module';
import { AdminModule } from './module/admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    MentorshipModule,
    MentorshipSessionModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
