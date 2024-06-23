import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from 'src/module/user/port/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/module/user/domain/user';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUniqueUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    return UserMapper.toDomain(user);
  }

  async save(user: Partial<User>): Promise<User> {
    const newEntity = await this.userRepository.save(user);

    return UserMapper.toDomain(newEntity);
  }
}
