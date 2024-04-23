import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @Column('jsonb', { nullable: true })
    password: string;
}

