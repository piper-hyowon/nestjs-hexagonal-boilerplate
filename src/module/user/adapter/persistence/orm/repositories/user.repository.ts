import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UserEntity } from '../entities/user.entity';
import { User } from 'src/module/user/domain/user';
import { PostgresqlErrorCodes } from 'src/common/constants/postgresql-error-codes';
import { UserRepository } from 'src/module/user/application/port/user.repository';
import { DuplicateValueError } from 'src/common/types/error/application-exceptions';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor() // private prisma: PrismaClient
  {}

  async findOneById(id: number): Promise<UserEntity> {
    return;

    // const user = await this.prisma.user.findFirst({ where: { id } });

    // return user;
  }

  async findOneByIdOrFail(id: number): Promise<UserEntity> {
    // const user = await this.prisma.user.findUnique({ id });
    // if (!user) {
    //   throw new ContentNotFoundError('user', id);
    // }
    // const user = this.prisma.user.findFirstOrThrow({ where: { id } });

    // return user;

    return;
  }
  async findUniqueUserByEmail(email: string): Promise<UserEntity | null> {
    return;

    // return await this.prisma.user.findUnique({ where: email });
  }

  async saveUniqueUserOrFail(user: Partial<User>): Promise<UserEntity> {
    return;

    // try {
    //   const newEntity = await this.prisma.user.create({
    //     data: {
    //       ...user,
    //     },
    //   });

    //   return newEntity;
    // } catch (err) {
    //   console.log(err);
    //   if (err.code === PostgresqlErrorCodes.UniqueViolation) {
    //     throw new DuplicateValueError('User', 'email', user.email);
    //   }

    //   throw err;
    // }
  }
}
