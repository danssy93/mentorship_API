import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UsersModule } from '../module/users/users.module';
import { RoleJwtStrategy } from './strategies/role-jwt.strategy';
import { CONFIGURATION } from 'src/libs';
import { RolesGuard } from './guards';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepository } from 'src/database/repositories';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      secret: CONFIGURATION.JWT.ACCESS_TOKEN.SECRET,
      signOptions: {
        expiresIn: CONFIGURATION.JWT.ACCESS_TOKEN.EXPIRY,
      },
    }),
  ],

  providers: [AuthService, RoleJwtStrategy, RolesGuard, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
