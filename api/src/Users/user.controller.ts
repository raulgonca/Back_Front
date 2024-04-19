

import { Controller, Get, Post, Body, Param, ParseIntPipe, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
//simport { User } from './user.entity';
//simport { LoginDto } from 'src/DTOs/login.dto';
//simport { AuthResponseDto } from 'src/DTOs/auth.dto';
//import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@ApiTags('Users') // Etiqueta para agrupar en la documentación de Swagger
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiBody({ type: String, description: 'Nombre de usuario y contraseña' }) // Describe el tipo de cuerpo esperado en la solicitud
    @ApiResponse({ status: 201, description: 'Usuario creado' }) // Respuesta exitosa
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return { menssage : "usuario Creado con existo" , User : newUser };
        
        } catch (error) {
            if (error instanceof ConflictException){
                throw new ConflictException("Erro al crear el usuario revise las credenciales ")
            }
            throw new Error('Error al crear el usuario');
        }
    }
  
//Devuelve los usuarios
    @Get()
    GetAllUser(){
        return this.userService.getAllUsers();
    }

    @Post('login')
    async login(@Body() { username, password }: { username: string; password: string }) {
      const user = await this.userService.findByUsername(username);

        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new UnauthorizedException('Credenciales incorrectas');
            }

        return { success: true, user: { username: user.username } };
    }
    
    @Get(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) { // Usa ParseIntPipe para convertir el parámetro de ruta en un número entero
        return this.userService.deleteUser(id);
    }

}


//   @Post('login')
//   async login(@Body() { username, password }: { username: string; password: string }) {
//       const user = await this.userService.findByUsername(username);
//
//   if (!user) {
//     throw new UnauthorizedException('Credenciales incorrectas');
//   }
//
//   const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//           throw new UnauthorizedException('Credenciales incorrectas');
//       }
//
//   return { success: true, user: { username: user.username } };
//}
//    @Post('/login')
//    async login(@Body() { nombre, password }: { nombre: string; password: string }) {
//        const user = await this.userService.findByUsername(nombre);
//    
//        if (!user) {
//          throw new UnauthorizedException("Credenciales incorrectas");
//        }
//    
//        const passwordMatch = await bcrypt.compare(password, user.password);
//        if (passwordMatch) {
//          return {
//            success: true,
//            user: { usaename: user.username },
//          };
//        }
//    
//        throw new UnauthorizedException("Credenciales incorrectas");
//      }





