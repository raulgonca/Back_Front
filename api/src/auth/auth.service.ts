import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../Users/infrastructure/dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/DTOs/login.dto';
import { User } from '../Users/domain/user.entity'; 
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

//Crear Usuarios
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, gmail } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      gmail,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Error al crear usuario');
    }
  }

//Login del Usuario
  async login(loginDto: LoginDto): Promise<string | null> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (!user) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }
//tengo que añadir que el email qeu el usuario guarda por registro el email añada a la base de datos
    const payload: JwtPayload = {username: user.username,password: ''}; // Definir los datos que deseamos incluir en el token
    const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: "100h" }); // Generar el token con una duración de 100 horas

    return token;
  }

//Verificar Tokens
  async verificarToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }

//Buscar usuario por nombre
  async findByUsername(username: string): Promise<User | undefined > {
    return this.userRepository.findOne({ where: { username } });
  }

//Validar user
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
      if (user && user.password === password) {
          return user;
    }
          return null;
  }
}
