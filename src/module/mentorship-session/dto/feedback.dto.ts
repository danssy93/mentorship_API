import { IsNotEmpty } from 'class-validator';

export class FeedbackDto {
  @IsNotEmpty()
  feedback: string;
}
