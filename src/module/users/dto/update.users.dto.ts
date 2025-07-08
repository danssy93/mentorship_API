import { IsOptional, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/database/entities';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  skills?: string[]; // or a comma-separated string, depending on implementation
}
