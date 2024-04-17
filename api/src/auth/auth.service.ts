// auth.service.ts
//import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
////import { UserRepository } from '../Users/user.repository';
//
//@Injectable()
//export class AuthService {
//  constructor(
//    private readonly jwtService: JwtService,
////    private readonly userRepository: UserRepository,
//  ) {}
//
//  async login(username: string, password: string) {
//    // Verificar las credenciales del usuario en la base de datos
//    const user = await this.userRepository.findOneByUsername(username);
//    if (!user || user.password !== password) {
//      throw new Error('Credenciales inválidas');
//    }
//
//    // Si las credenciales son correctas, generar un token de autenticación
//    const payload = { username: user.username, sub: user.id };
//    const accessToken = this.jwtService.sign(payload);
//
//    // Devolver el token de autenticación
//    return { accessToken };
//  }
//}
//