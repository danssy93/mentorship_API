import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.guard';
import { UserRole } from 'src/database/entities';
import { CreateMentorshipRequestDto } from '../../dto/create.mentorship-request.dto';
import { MentorshipService } from '../../services/mentorship/mentorship.service';

@Controller('mentorship')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MentorshipController {
  constructor(private readonly mentorshipService: MentorshipService) {}

  @Roles(UserRole.MENTEE)
  @Post('request')
  request(@CurrentUser() user, @Body() dto: CreateMentorshipRequestDto) {
    return this.mentorshipService.requestMentorship(user.userId, dto.mentorId);
  }

  @Roles(UserRole.MENTOR)
  @Get('requests')
  getRequests(@CurrentUser() user) {
    return this.mentorshipService.getRequestsForMentor(user.userId);
  }

  @Roles(UserRole.MENTEE)
  @Get('my-requests')
  getMyRequests(@CurrentUser() user) {
    return this.mentorshipService.getRequestsByMentee(user.userId);
  }

  @Roles(UserRole.MENTOR)
  @Post('respond/:id')
  respond(@Param('id') id: number, @Query('accept') accept: string) {
    return this.mentorshipService.respondToRequest(+id, accept === 'true');
  }
}
