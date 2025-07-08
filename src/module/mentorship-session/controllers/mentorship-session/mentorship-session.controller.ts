import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.guard';
import { UserRole } from 'src/database/entities';
import { CreateSessionDto } from '../../dto/create-session.dto';
import { FeedbackDto } from '../../dto/feedback.dto';
import { MentorshipSessionService } from '../../services/mentorship-session/mentorship-session.service';

@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MentorshipSessionController {
  constructor(private readonly sessionService: MentorshipSessionService) {}

  @Roles(UserRole.MENTEE)
  @Post()
  schedule(@CurrentUser() user, @Body() dto: CreateSessionDto) {
    return this.sessionService.schedule(user.userId, dto);
  }

  @Roles(UserRole.MENTOR, UserRole.MENTEE)
  @Get()
  getMine(@CurrentUser() user) {
    return this.sessionService.getMySessions(user.userId, user.role);
  }

  @Roles(UserRole.MENTOR)
  @Post(':id/complete')
  complete(@Param('id') id: number) {
    return this.sessionService.markCompleted(+id);
  }

  @Roles(UserRole.MENTOR, UserRole.MENTEE)
  @Post(':id/feedback')
  feedback(
    @CurrentUser() user,
    @Param('id') id: number,
    @Body() dto: FeedbackDto,
  ) {
    return this.sessionService.leaveFeedback(user.userId, +id, user.role, dto);
  }
}
