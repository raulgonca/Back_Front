// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../Users/domain/user.entity';
import { DirectusModule } from '../Directus/directus.module';
import { DirectusService } from '../Directus/application/directus.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DirectusModule],
  controllers: [AuthController],
  providers: [AuthService, DirectusService],
})
export class AuthModule {}
