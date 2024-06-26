import { Module } from '@nestjs/common';

import { EnvironmentModule } from './environment/environment.module';
import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfigModule } from './database/orm/orm.module';
import { OrmConfigService } from './database/orm/orm.service';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    EnvironmentModule,
    UtilModule,
    TypeOrmModule.forRootAsync({
      imports: [OrmConfigModule],
      inject: [OrmConfigService],
      useClass: OrmConfigService,
    }),
    UserModule,
    IamModule,
  ],
})
export class MainModule {}
