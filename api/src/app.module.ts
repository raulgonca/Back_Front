import config from './config';
import * as dotenv from "dotenv";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Users/user.module'; 
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './Projects/project.module';
import { ClienteModule } from './Clients/client.module';
// import { ProjectUserModule } from './projects_users/project-user.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.dbType,
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbDatabase,
      entities: config.typeormEntities,
      synchronize: config.typeormSynchronize,
      migrations: config.typeormMigrations,
    }),
    UserModule,
    ProjectModule,
    AuthModule,
    ClienteModule
    // ProjectUserModule,
    
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
