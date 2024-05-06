import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Project } from '../Projects/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('jsonb', { nullable : true })
  password: string;

  @Column('jsonb', { nullable : true })
  gmail: string;

  @Column({ default: 'basic' }) // Agregamos la columna 'role' con valor por defecto 'basic'
  role: string;

  @OneToMany(() => Project, project => project.owner)
  ownedProjects: Project[];

  @ManyToMany(() => Project, project => project.collaborators)
  projects: Project[];
  
}
