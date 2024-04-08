import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Users/user.entity';
import { UserService } from './Users/user.service';
import { UserController } from './Users/user.controller';
import { Project } from './Projects/project.entity';
import { ProjectService } from './Projects/project.service';
import { ProjectController } from './Projects/project.controller';
import axios from 'axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'postgres',
      entities: [User, Project],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Project]),
  ],
  providers: [UserService, ProjectService],
  controllers: [UserController, ProjectController],
})
export class AppModule {
  constructor() {
    // Configurar axios globalmente con la URL base y las opciones de CORS
    axios.defaults.baseURL = 'http://localhost:3000'; // Establecer la URL base de tu servidor NestJS
    axios.defaults.withCredentials = true; // Habilitar el envío de cookies de autenticación
  }
}
