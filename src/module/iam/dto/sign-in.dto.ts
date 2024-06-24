import { IsEmail, MinLength } from 'class-validator';
import { User } from 'src/module/user/domain/user';
import { PASSWORD_MIN_LENGTH } from '../constants/authentication';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;
}

export class SignInPayload {
  sub: string;
  email: string;
}

export class JWT {
  accessToken: string;
  refreshToken: string;
}

export class SignInResponse extends JWT {
  user: Omit<User, 'password'>;
}
