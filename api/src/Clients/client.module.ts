import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { Client } from "./client.entity";
import { UserModule } from "../Users/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Client]), UserModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClienteModule {}