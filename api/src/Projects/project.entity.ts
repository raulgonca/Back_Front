import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../Users/user.entity'; // Asumiendo que tienes un modelo de usuario

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  nameproject : string;

  @Column('text')
  description : string;

  @Column('date')
  fechaInicio : Date;

  @Column('date')
  fechaFinalizacion : Date;

  @ManyToMany(() => User) // Definir la relación Many-to-Many con los usuarios
  @JoinTable() // Tabla de unión
  colaboradores: User[];
}
