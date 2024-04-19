import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './user.entity';

import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { CreateUserDto } from '../DTOs/create-user.dto';

@Injectable()
export class UserService {
    userService: any;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
    async findByUsername(username: string): Promise<User> {
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

//import { ConflictException, Injectable } from "@nestjs/common";
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
//import { User } from './user.entity';
//import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
//import { CreateUserDto } from "src/DTOs/create-user.dto";
//import * as bcrypt from "bcryptjs";
////import { JwtService } from "@nestjs/jwt";
//
//@Injectable()
//@ApiTags('Users') // Etiqueta para agrupar en la documentación de Swagger
//export class UserService {
//    constructor(
//        @InjectRepository(User)
//        private readonly userRepository: Repository<User>,
//        private readonly userService: UserService,
//        //private readonly jwtService: JwtService
//      ) {}
//
//  |  @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción de la operación
//  |  @ApiBody({ type: User }) // Especifica el tipo de cuerpo esperado en la solicitud
//  |  async createUser(createUserDto : CreateUserDto) : Promise<User>{
//  |      const { username , password } = createUserDto;
//  |      const userinvalidated = await this.userRepository.findOne({
//  |          where : [{ username }],
//  |      });
//
//  |      if (userinvalidated){
//  |          throw new ConflictException("El nombre de usuario ya existe");
//  |      }
//  |      
//  |      const hashedPassword = await bcrypt.hash(password, 10);
//  |      const newUser  =this.userRepository.create({username, password: hashedPassword});
//
//  |      return this.userRepository.save(newUser);
//  |  }    
//    
//  |  @ApiOperation({ summary: 'Buscar usuario por nombre de usuario' }) // Descripción de la operación
//  |  @ApiParam({ name: 'username', description: 'Nombre de usuario', type: String }) // Parámetro de la ruta
//  |  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User }) // Respuesta exitosa
//  |  async findByUsername(username: string): Promise<User> {
//  |      return this.userRepository.findOne({ where: { username } });
//  |  }
//
//    @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción de la operación
//    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] }) // Respuesta exitosa
//    async getAllUsers(): Promise<User[]> {
//        return this.userRepository.find();
//    }
//
//    @ApiOperation({ summary: 'Eliminar un usuario por ID' }) // Descripción de la operación
//    @ApiParam({ name: 'id', description: 'ID del usuario', type: Number }) // Parámetro de la ruta
//    @ApiResponse({ status: 204, description: 'Usuario eliminado' }) // Respuesta exitosa
//    async deleteUser(id: number): Promise<void> {
//        await this.userRepository.delete(id);
//    }
//
//    async validateUser(username: string, password: string): Promise<any> {
//        const user = await this.userService.findByUsername(username);
//        if (user && user.password === password) {
//          return user;
//        }
//        return null;
//      }
//    
//      async generateToken(user: any): Promise<string> {
//        const payload = { username: user.username, sub: user.id };
//        return this.jwtService.sign(payload);
//      }

