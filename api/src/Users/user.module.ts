import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository"; // Importa UserRepository
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])], // Usa UserRepository en lugar de User
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
