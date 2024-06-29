import { Module } from '@nestjs/common';

import { OrmUserRepository } from './repositories/user.repository';
import { UserRepository } from 'src/module/user/application/port/user.repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: OrmUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class OrmUserPersistenceModule {}
