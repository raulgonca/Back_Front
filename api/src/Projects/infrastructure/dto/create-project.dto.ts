import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ description: 'Nombre del proyecto' })
    @IsString()
    @IsNotEmpty()
    nameproject: string;

    @ApiProperty({ description: 'Breve descripción del proyecto' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Fecha de Inicio' })
    @IsDateString()
    fechaInicio: Date;

    @ApiProperty({ description: 'Fecha de Finalización' })
    @IsDateString()
    fechaFinalizacion: Date;

    @ApiProperty({ description: 'Propietario del proyecto' })
    @IsString()
    owner: string;

    @ApiProperty({ description: 'Colaboradores agregados' })
    @IsString({ each: true }) 
    @IsOptional() 
    colaborador?: string[];

    @ApiProperty({ description: 'Clientes asociados al proyecto' })
    @IsString({ each: true }) 
    @IsOptional() 
    cliente?: string[];

    @ApiProperty({ description: 'Tiempo estimado del proyecto en horas' })
    @IsNumber()
    @IsOptional()
    time?: number;

}
