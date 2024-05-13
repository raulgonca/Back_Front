import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ description: 'Nombre del proyecto' })
    @IsString()
    @IsNotEmpty()
    nameproject : string;

    @ApiProperty({ description: 'Breve descripción del proyecto' })
    @IsString()
    @IsNotEmpty()
    description : string;

    @ApiProperty({ description: 'Fecha de Inicio' })
    @IsDateString()
    fechaInicio : Date;

    @ApiProperty({ description: 'Fecha de Finalización' })
    @IsDateString()
    fechaFinalizacion : Date;

    @IsString()
    owner : string;

    @ApiProperty({ description: 'Colaboradores agregados' })
    @IsString()
    @IsOptional()
    colaborador : string[] ;

    @IsString()
    @IsOptional()
    cliente?: string[];

    @IsNumber()
    @IsOptional()
    time: number

}