import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserController } from './project-user.controller';
import { ProjectUserService } from './project-user.service';
import { UserProject } from "./project-user.entity";
@Module({
    imports: [ TypeOrmModule.forFeature([UserProject]) ],
    controllers: [ ProjectUserController ],
    providers: [ ProjectUserService ],
    exports: [ ProjectUserService ]
})
export class ProjectUserModule {}