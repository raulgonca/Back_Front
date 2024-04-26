import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import { User } from './user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  @ApiBody({ type: CreateUserDto, description: 'Datos para crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado satisfactoriamente' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return { message: 'Usuario creado exitosamente', user: newUser };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Error al crear el usuario: las credenciales ya existen');
      }
      throw new Error('Error al crear el usuario');
    }
  }

  // Obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Buscar usuario por nombre de usuario
  @Post('username')
  async findByUsername(@Body() body: { username: string }): Promise<User | undefined> {
    const { username } = body;
    return this.userService.findByUsername(username);
  }
}
