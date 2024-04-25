import { Controller, Get, Post, Body, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiBody, ApiResponse,  } from '@nestjs/swagger';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import { LoginDto } from 'src/DTOs/login.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

//Creamos los usuarios
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
  
//Devuelve todos los usuarios
    @Get()
    GetAllUser(){
        return this.userService.getAllUsers();
    }


//login con credenciales de usuario
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.findByUsername(loginDto.username);

      if (!user) {
        throw new UnauthorizedException('Usuario incorrecto');
      }

      const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      return { success: true, user: { username: user.username } };
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

}




