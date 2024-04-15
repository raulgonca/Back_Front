// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string, password: string }) {
    return this.authService.login(credentials.username, credentials.password);
  }

  @Post('logout')
  async logout() {
    // Implementa la lógica para cerrar la sesión del usuario si es necesario
  }
}
