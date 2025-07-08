import { Body, Controller, Logger, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from '../services';
import { Public } from '../strategies/public.strategy';
import { User, UserRole } from 'src/database/entities';
import { CurrentUser } from 'src/common/current-user.guard';
import { ResponseFormat } from 'src/common/ResponseFormat';
import { BaseLoginDto } from '../dto';
import { Response } from 'express';
import { RolesGuard } from '../guards';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from 'src/module/users/dto/create.users.dto';
import { Roles } from '../decorator/roles.decorator';

@ApiTags('Authentication Module')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  // auth.controller.ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  /**
   * User Login
   * @description Authenticates a customer using their credentials and returns an access token.
   * @param loginDto - The customer's login details (email/phone and password).
   * @param res - The HTTP response object.
   * @returns JSON response with access token and user details.
   */
  @ApiOperation({
    summary: 'Customer Authentication',
    description: 'Validate login credential and provide auth token',
  })
  @ApiOkResponse({
    description: 'Login successful',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBody({
    type: BaseLoginDto,
    description: 'Login details',
  })
  @Public()
  @Post('login')
  async login(@Body() loginDto: BaseLoginDto, @Res() res: Response) {
    const { message, payload, status } = await this.authService.login(loginDto);

    return ResponseFormat.success(res, message, payload, status);
  }

  /**
   * Logout a customer
   * @description Blacklist a user token
   * @param res - The HTTP response object.
   * @returns JSON response with access token and user details.
   */
  @ApiOperation({
    summary: 'Deactivate customer token',
    description: 'Logout customer and blacklist token',
  })
  @ApiOkResponse({
    description: 'Deactivation/Logout successful',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid user',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or required parameters missing.',
  })
  @ApiBearerAuth('CustomerJWT')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response, @CurrentUser() user: User) {
    await this.authService.logout(user.id);

    return ResponseFormat.ok(res, 'Logged out successfully');
  }
}
