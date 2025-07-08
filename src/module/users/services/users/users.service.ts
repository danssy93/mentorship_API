import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User, UserRole } from 'src/database/entities/user.entity';
import { UpdateUserDto } from '../../dto/update.users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Find one user by any criteria
   */
  async findOne(
    filter: FindOptionsWhere<User>,
    throwError = true,
    options?: object,
  ): Promise<User> {
    const user = await this.userRepo.findOne({ where: filter, ...options });

    if (throwError && !user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * Update a user's details
   */
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepo.update(id, dto);
    return this.findOne({ id });
  }

  /**
   * Update a user's role
   */
  async updateRole(id: number, role: UserRole): Promise<User> {
    const user = await this.findOne({ id });
    user.role = role;
    return this.userRepo.save(user);
  }

  /**
   * List all users
   */
  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
