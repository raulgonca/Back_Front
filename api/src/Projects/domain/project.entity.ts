import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable : true })
  owner : string;

  @Column('jsonb', { nullable : true })
  collaborators : string[];

  @Column('jsonb', { nullable : true })
  cliente : string[];

  @Column('jsonb', { nullable: true })
  time: number;
}
