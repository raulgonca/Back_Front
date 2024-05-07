// cliente.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  cif: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column({ name: 'nombre_empresa' })
  nombreEmpresa: string;
}
