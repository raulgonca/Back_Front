import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './user.entity';
<<<<<<< HEAD
=======
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from "src/DTOs/create-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
>>>>>>> 26191f5a (15/04 update)

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
      ) {}

<<<<<<< HEAD
    async createUser(username: string, password: string) : Promise<User>{
        const poll = this.userRepository.create({ username, password});
        return this.userRepository.save(poll);
    }

    async findByUsername(username: string): Promise<User>{
        return this.userRepository.findOne({ where : { username }});
=======
    @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción de la operación
    @ApiBody({ type: User }) // Especifica el tipo de cuerpo esperado en la solicitud
    async createUser(createUserDto : CreateUserDto) : Promise<User>{
        const { username , password } = createUserDto;
        const userinvalidated = await this.userRepository.findOne({
            where : [{ username }],
        });

        if (userinvalidated){
            throw new ConflictException("El nombre de usuario ya existe");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  =this.userRepository.create({username, password: hashedPassword});

        return this.userRepository.save(newUser);
    }    
    
    @ApiOperation({ summary: 'Buscar usuario por nombre de usuario' }) // Descripción de la operación
    @ApiParam({ name: 'username', description: 'Nombre de usuario', type: String }) // Parámetro de la ruta
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User }) // Respuesta exitosa
    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
>>>>>>> 26191f5a (15/04 update)
    }

    async getAllUser(): Promise<User[]>{
        return this.userRepository.find();
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
<<<<<<< HEAD
      }

    

}
=======
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && user.password === password) {
          return user;
        }
        return null;
      }
    
      async generateToken(user: any): Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
      }
}
>>>>>>> 26191f5a (15/04 update)
