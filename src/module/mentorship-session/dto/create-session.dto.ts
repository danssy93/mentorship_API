import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsDateString()
  scheduledAt: string;

  @IsNotEmpty()
  @IsNumber()
  durationMinutes: number;

  @IsNotEmpty()
  mentorId: number;
}
