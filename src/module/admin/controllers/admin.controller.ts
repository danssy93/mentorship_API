import { Controller, UseGuards, Get, Put, Param, Body } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/database/entities';
import { UsersService } from 'src/module/users/services/users/users.service';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id/role')
  updateUserRole(@Param('id') id: number, @Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateRole(+id, dto.role);
  }
}
