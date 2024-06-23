// inbound port

import { User } from '../domain/user';
import { FindUniqueUserQuery } from './dto/user.query';
import { CreateUserCommand } from './dto/user.command';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserCommand): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findUnqiueUser(findUniqueUserDto: FindUniqueUserQuery): Promise<User> {
    return await this.userRepository.findUniqueUser(findUniqueUserDto.email);
  }
}
