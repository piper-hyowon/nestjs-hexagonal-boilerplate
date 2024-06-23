import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getEnvFilePath } from './environment';
import { EnvironmentService } from './environment.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [getEnvFilePath()],
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
