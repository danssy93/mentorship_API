import { Module } from '@nestjs/common';
import { AdminUserController } from './controllers/admin.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AdminUserController],
})
export class AdminModule {}
