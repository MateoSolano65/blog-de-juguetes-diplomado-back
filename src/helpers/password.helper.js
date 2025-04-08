import { hash, compare } from 'bcrypt';

export class PasswordHelper {
  static async hashPassword(password) {
    return await hash(password, 10);
  }

  static async comparePassword(password, hashedPassword) {
    return await compare(password, hashedPassword);
  }
}
