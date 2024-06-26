import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/authentication';
import { plainToInstance } from 'class-transformer';
import { Expose } from 'class-transformer';

export class ActiveUserData {
  @Expose()
  sub: string;

  @Expose()
  email: string;
}

export const ActiveUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];

  return plainToInstance(ActiveUserData, user, {
    excludeExtraneousValues: true,
  });
});
