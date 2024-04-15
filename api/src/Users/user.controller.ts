<<<<<<< HEAD
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
=======
import { Controller, Get, Post, Body, Param, ParseIntPipe, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import { User } from './user.entity';
import { LoginDto } from 'src/DTOs/login.dto';
import { AuthResponseDto } from 'src/DTOs/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@ApiTags('Users') // Etiqueta para agrupar en la documentación de Swagger
export class UserController {
    constructor(private readonly userService: UserService,private authService: AuthService) {}

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
>>>>>>> 26191f5a (15/04 update)
    }
  
//Devuelve los usuarios
    @Get()
    GetAllUser(){
        return this.userService.getAllUser();
    }

<<<<<<< HEAD
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

=======
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
    @Post('/login')
    async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
        const { accessToken, expiresIn } = await this.authService.login(authCredentialsDto);
    return new AuthResponseDto(accessToken, expiresIn);
    }

>>>>>>> 26191f5a (15/04 update)
    @Get(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) { // Usa ParseIntPipe para convertir el parámetro de ruta en un número entero
        return this.userService.deleteUser(id);
    }
}