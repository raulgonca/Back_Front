import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; 

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único del proyecto' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nombre del proyecto' })
  nameproject: string;

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Breve descripción del proyecto' })
  description: string;

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Fecha de Inicio del proyecto' })
  fechaInicio: Date;

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Fecha de Finalización del proyecto' })
  fechaFinalizacion: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Propietario del proyecto' })
  owner: string;

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Colaboradores del proyecto' })
  collaborators: string[];

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Clientes asociados al proyecto' })
  cliente: string[];

  @Column('jsonb', { nullable: true })
  @ApiProperty({ description: 'Tiempo estimado del proyecto en horas' })
  time: number;
}
