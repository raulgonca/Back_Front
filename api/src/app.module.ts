import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './Users/user.entity';
import { UserService } from './Users/user.service';
import { UserController } from './Users/user.controller';
import { Project } from './Projects/project.entity';
import { ProjectService } from './Projects/project.service';
import { ProjectController } from './Projects/project.controller';

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

export class AppModule {}
