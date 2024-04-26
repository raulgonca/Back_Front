import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../Users/user.entity'; // Importa la entidad de usuario si existe

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key_here', // Clave secreta para verificar la firma del token
    });
  }

  async validate(payload: any): Promise<User> {
    // Aquí puedes realizar la lógica de validación del usuario (por ejemplo, consultar en la base de datos)
    // Retorna el usuario si la validación es exitosa
    return { id: payload.sub, username: payload.username } as User;
  }
}


