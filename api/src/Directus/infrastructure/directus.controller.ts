import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { DirectusService } from "../application/directus.service";
import { CreateUserDto } from "src/Users/infrastructure/dto/create-user.dto";
import { User } from "src/Users/domain/user.entity";

@Controller('directus')
export class DirectusController{
    constructor(private readonly directusService: DirectusService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
        try {
          const newUser = await this.directusService.createUser(createUserDto);
          return { message: 'Usuario creado exitosamente', user: newUser };
        } catch (error) {
          if (error instanceof ConflictException) {
            throw new ConflictException('Error al crear el usuario: las credenciales ya existen');
          }
          throw new Error('Error al crear el usuario');
        }
      }
    

}