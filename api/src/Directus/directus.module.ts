// src/directus/directus.module.ts
import { Module } from '@nestjs/common';
import { DirectusService } from '../Directus/application/directus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DirectusService],
  exports: [DirectusService],
})
export class DirectusModule {}
