// user.repository.ts

import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }

  // Agrega otros métodos personalizados según sea necesario
}
