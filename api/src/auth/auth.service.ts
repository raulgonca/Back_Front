import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/user.entity'; // Importa la entidad User

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository,
    private readonly jwtService: JwtService, // Inyecta el servicio JWT
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
