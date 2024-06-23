// import path from 'path';

import path from 'path';

export enum SupportedEnvironment {
  local = 'local',
  development = 'development',
  production = 'prod',
}

export interface Configuration {
  // STAGE Environment
  readonly ENV: SupportedEnvironment;

  // API SERVICE VARIABLE
  readonly PORT: number;
  readonly API_VERSION: string;
  readonly HTTP_BODY_SIZE_LIMIT: string;
  readonly HTTP_URL_LIMIT: string;

  // DB
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_NAME: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
  readonly DB_USE_SYNCHRONIZE: boolean;

  // JWT
  readonly JWT_SECRET: string;
  readonly JWT_ACCESS_EXPIRES_IN: string;
  readonly JWT_REFRESH_EXPIRES_IN: string;

  // In-momory DB
  readonly REDIS_PATH: string;
}

export const getEnvFilePath = (): string =>
  path.join(
    process.cwd(),
    `/env/.env.${process.env.NODE_ENV ?? SupportedEnvironment.development}`,
  );

export type EnvironmentKey = keyof Configuration;
