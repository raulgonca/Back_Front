import { User } from '../Users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameproject: string;

  @Column('text')
  description: string;

  @Column('date')
  fechaInicio: Date;

  @Column('date')
  fechaFinalizacion: Date;

  @ManyToOne(() => User, user => user.projects)
  creator: User;
    User: any;
}