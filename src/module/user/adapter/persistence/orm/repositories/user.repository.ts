import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { User } from 'src/module/user/domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { PostgresqlErrorCodes } from 'src/common/constants/postgresql-error-codes';
import { UserRepository } from 'src/module/user/application/port/user.repository';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findUniqueUser(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: Partial<User>): Promise<User> {
    try {
      const newEntity = await this.userRepository.save(user);

      return UserMapper.toDomain(newEntity);
    } catch (err) {
      if (err.code === PostgresqlErrorCodes.UniqueViolation) {
        throw new ConflictException(); // TODO: HTTP ERROR 대신 커스텀 에러 필요
      }
      throw err;
    }
  }
}
