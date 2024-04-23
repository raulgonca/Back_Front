import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository'; // Importa UserRepository
import { CreateUserDto } from '../DTOs/create-user.dto';
import * as bcrypt from "bcryptjs";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Injectable()
export class UserService {
  userService: any;
    constructor(
        @InjectRepository(UserRepository) // Usa UserRepository en lugar de User
        private readonly userRepository: UserRepository,
      ) {}
      

    @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción de la operación
    @ApiBody({ type: User }) // Especifica el tipo de cuerpo esperado en la solicitud
    async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { username, password } = createUserDto;
         // Verifica si ya existe un usuario con el mismo nombre de usuario
      const userInvalidated = await this.userRepository.findOne({
        where: [{ username }],
      });
         if (userInvalidated) {
        throw new ConflictException('El nombre de usuario ya existe');
      }
         // Hashea la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
      });
         return this.userRepository.save(newUser);
    }   

    @ApiOperation({ summary: 'Buscar usuario por nombre de usuario' }) // Descripción de la operación
    @ApiParam({ name: 'username', description: 'Nombre de usuario', type: String }) // Parámetro de la ruta
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User }) // Respuesta exitosa
    async findByUsername(username: string): Promise<User | undefined > {
        return this.userRepository.findOne({ where: { username } });
    }

        @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción de la operación
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] }) // Respuesta exitosa
    async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
      if (user && user.password === password) {
          return user;
    }
          return null;
    }
}
