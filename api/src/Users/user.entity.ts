import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Project } from '../Projects/project.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @Column('jsonb', { nullable: true })
    password: string;
  
    @OneToMany(() => Project, project => project.User)
    projects: Project[];
}

