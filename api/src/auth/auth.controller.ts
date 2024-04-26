//auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/DTOs/login.dto';
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    //login con credenciales de usuario
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.findByUsername(loginDto.username);

      if (!user) {
        throw new UnauthorizedException('Usuario incorrecto');
      }

      const passwordMatch = await bcrypt.compare(loginDto.password, loginDto.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      return { success: true, user: { username: user.username } };
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authService.findByUsername(username);
      if (user && user.password === password) {
          return user;
    }
          return null;
    }

}