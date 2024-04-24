import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Users/user.module';  
import { ProjectModule } from './Projects/project.module';
import { ProjectUserModule } from './projects_users/project-user.module';
import config from './config';
import * as dotenv from "dotenv";

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
    ProjectUserModule
  ],
  providers: [UserModule],
  controllers: [],
})
export class AppModule {}
