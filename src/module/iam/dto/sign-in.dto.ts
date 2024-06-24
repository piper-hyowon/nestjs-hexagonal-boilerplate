import { IsEmail, MinLength } from 'class-validator';
import { User } from 'src/module/user/domain/user';
import { PASSWORD_MIN_LENGTH } from '../constants/authentication';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;
}

export class SignInPayload {
  sub: string;
  email: string;
}

export class JWT {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SignInResponse extends JWT {
  @ApiProperty({ type: OmitType(User, ['password']) })
  user: Omit<User, 'password'>;

  @ApiProperty()
  lastLoggedAt: Date;
}
