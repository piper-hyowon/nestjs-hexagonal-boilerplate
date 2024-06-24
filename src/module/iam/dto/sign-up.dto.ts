import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserGrade } from 'src/module/user/domain/value-objects/user-grade';
import { PASSWORD_MIN_LENGTH } from '../constants/authentication';

export class SignUpDto {
  @IsEmail()
  email: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @IsEnum(UserGrade)
  grade: UserGrade;
}
