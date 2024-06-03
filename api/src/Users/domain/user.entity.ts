import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Project } from '../../Projects/domain/project.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único ID del usuario' }) 
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre de usuario' }) 
  username: string;

  @Column('jsonb', { nullable : true })
  @ApiProperty({ description: 'Contraseña del usuario' }) 
  password: string;

  @Column('jsonb', { nullable : true })
  @ApiProperty({ description: 'Correo electrónico de Gmail del usuario' }) 
  gmail: string;

  @Column({ default: 'basic' })
  @ApiProperty({ description: 'Rol del usuario', default: 'basic' }) 
  role: string;

  @OneToMany(() => Project, project => project.owner)
  @ApiProperty({ description: 'Proyectos de los que el usuario es propietario' }) 
  ownedProjects: Project[];

  @ManyToMany(() => Project, project => project.collaborators)
  @ApiProperty({ description: 'Proyectos en los que el usuario colabora' }) 
  projects: Project[];
}
