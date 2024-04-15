import { Controller, Get, Post,Body, Param, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
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
      const user = await this.userService.findByUsername(username);

<<<<<<< HEAD
      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return { success: true, user: { username: user.username },
      }

      }
    }
=======
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

    return { success: true, user: { username: user.username } };
  }
>>>>>>> 417db070 (a)

    @Get(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) { // Usa ParseIntPipe para convertir el parámetro de ruta en un número entero
        return this.userService.deleteUser(id);
    }
}