import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID del cliente' })
  id: number;

  @Column()
  @ApiProperty({description: 'Nombre del cliente' })
  nombre: string;

  @Column()
  @ApiProperty({description: 'CIF del cliente' })
  cif: string;

  @Column()
  @ApiProperty({description: 'Teléfono del cliente' })
  telefono: string;

  @Column()
  @ApiProperty({description: 'Email del cliente' })
  email: string;

  @Column({ name: 'nombre_empresa' })
  @ApiProperty({description: 'Nombre de la empresa del cliente' })
  nombreEmpresa: string;
}
