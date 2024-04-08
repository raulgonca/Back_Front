import { Controller, Get, Post,Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}
    @Post()
    async createUser(@Body() { username, password }: { username: string; password: string }) {
      try {
        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Llamar al método createUser del UserService con la contraseña hasheada
        return this.userService.createUser(username, hashedPassword);
      } catch (error) {
        // Manejar cualquier error que pueda surgir, como errores de hashing
        throw new Error('Error al crear el usuario');
      }
    }
  
//Devuelve los usuarios
    @Get()
    GetAllUser(){
        return this.userService.getAllUser();
    }

    @Post('login')
  async login(@Body() { username, password }: { username: string; password: string }) {
    try {
      // Obtener el usuario de la base de datos por su nombre de usuario
      const user = await this.userService.findByUsername(username);

      // Verificar si el usuario existe
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Contraseña válida, iniciar sesión exitosamente
        return { message: 'Inicio de sesión exitoso' };
      } else {
        // Contraseña incorrecta
        throw new Error('Contraseña incorrecta');
      }
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  }


    @Get(':id')
    deleteUser(@Param('id') id: number) {
      return this.userService.deleteUser(id);
    }

}