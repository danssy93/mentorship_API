import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.guard';
import { UserRole } from 'src/database/entities';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dto/update.users.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get current user's profile
   */
  @Get('me')
  getCurrentUser(@CurrentUser() user: { userId: number }) {
    return this.usersService.findOne({ id: user.userId });
  }

  /**
   * Update current user's profile
   */
  @Put('me')
  updateCurrentUser(
    @CurrentUser() user: { userId: number },
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(user.userId, dto);
  }

  /**
   * Admin-only: Get another user's profile by ID
   */
  @Roles(UserRole.ADMIN)
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne({ id });
  }
}
