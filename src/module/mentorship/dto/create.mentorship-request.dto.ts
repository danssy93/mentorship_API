import { IsNotEmpty } from 'class-validator';

export class CreateMentorshipRequestDto {
  @IsNotEmpty()
  mentorId: number;
}
