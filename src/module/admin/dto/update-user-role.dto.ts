import { IsEnum } from 'class-validator';
import { UserRole } from 'src/database/entities';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
