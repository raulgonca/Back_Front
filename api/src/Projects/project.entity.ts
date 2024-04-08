import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}