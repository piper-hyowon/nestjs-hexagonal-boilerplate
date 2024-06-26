// inbound port

import { FindUniqueUserQuery } from '../dto/user.query';
import { CreateUserCommand } from '../dto/user.command';
import { UserRepository } from './user.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/user';

export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserCommand): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findUnqiueUser(findUniqueUserDto: FindUniqueUserQuery): Promise<User> {
    return await this.userRepository.findUniqueUser(findUniqueUserDto.email);
  }

  async findOneByIdOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
