import { Module } from '@nestjs/common';

import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilModule } from './util/util.module';
import { OrmConfigModule } from 'src/config/database/orm/orm.module';
import { OrmConfigService } from 'src/config/database/orm/orm.config.service';
import { EnvironmentModule } from 'src/config/environment/environment.module';
import { InMemoryModule } from 'src/config/database/in-memory/in-memory.module';

@Module({
  imports: [
    EnvironmentModule,
    UtilModule,
    TypeOrmModule.forRootAsync({
      imports: [OrmConfigModule],
      inject: [OrmConfigService],
      useClass: OrmConfigService,
    }),
    InMemoryModule,
    UserModule,
    IamModule,
  ],
})
export class MainModule {}
