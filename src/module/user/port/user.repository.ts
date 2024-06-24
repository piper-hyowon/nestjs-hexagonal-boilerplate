// outbound port
import { User } from '../domain/user';

export abstract class UserRepository {
  abstract findUniqueUser(email: string): Promise<User>;
  abstract save(user: Partial<User>): Promise<User>;
  abstract findOneById(id: number): Promise<User>;
}
