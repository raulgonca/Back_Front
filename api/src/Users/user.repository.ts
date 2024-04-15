// user.repository.ts

import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { username } });
  }

  // Agrega otros métodos personalizados según sea necesario
}
