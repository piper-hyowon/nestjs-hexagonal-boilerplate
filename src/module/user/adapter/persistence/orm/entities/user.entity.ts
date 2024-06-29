import { UserGrade } from 'src/module/user/domain/value-objects/user-grade';

export class UserEntity {
  id: number;
  email: string;
  password: string;
  grade: UserGrade;
  signedUpAt: Date;
  updatedAt: Date;
}
