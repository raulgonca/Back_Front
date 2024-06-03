import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user.entity';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../application/user.service';

@Controller('users')
@ApiTags('Users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Crear un nuevo usuario
  @Post()
  @ApiBody({ type: CreateUserDto, description: 'Datos para crear un nuevo usuario' }) // Documentación del cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'Usuario creado satisfactoriamente' }) // Documentación de la respuesta exitosa
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

  // Buscar usuarios por nombre de usuario (con Query)
  @Get('search')
  async searchUsersByUsername(@Query('username') username: string): Promise<User[]> {
    if (!username) {
      throw new BadRequestException('El parámetro "username" es obligatorio');
    }

    const users = await this.userService.findUsersByUsername(username);
    return users;
  }

  // Eliminar un usuario por su ID
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
