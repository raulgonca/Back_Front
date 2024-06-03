import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./infrastructure/user.controller";
import { UserService } from "./application/user.service";
import { User } from "./domain/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Usa UserRepository en lugar de User
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
