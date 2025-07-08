import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/database/entities';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  expertise?: string;
}
