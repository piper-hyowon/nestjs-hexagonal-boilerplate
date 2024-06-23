import { UserGrade } from './value-objects/user-grade';

export class User {
  constructor(
    public email: string,
    public grade: UserGrade,
    public signedUpAt: Date,
  ) {}
}
