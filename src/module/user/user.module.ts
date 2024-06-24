import { Module } from '@nestjs/common';
import { OrmUserPersistenceModule } from './adapter/persistence/orm/orm-persistence.module';
import { UserService } from './port/user.service';

@Module({
  imports: [OrmUserPersistenceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
