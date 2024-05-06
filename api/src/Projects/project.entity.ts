import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../Users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameproject : string;

  @Column('jsonb', { nullable : true })
  description : string;

  @Column('jsonb', { nullable : true })
  fechaInicio: Date;
  
  @Column('jsonb', { nullable : true })
  fechaFinalizacion: Date;

  @ManyToOne(() => User, user => user.ownedProjects)
  owner : User;


  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  collaborators : User[];
}
