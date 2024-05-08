import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ description: 'Nombre del proyecto' })
    nameproject : string;

    @ApiProperty({ description: 'Breve descripción del proyecto' })
    description : string;

    @ApiProperty({ description: 'Fecha de Inicio' })
    fechaInicio : Date;

    @ApiProperty({ description: 'Fecha de Finalización' })
    fechaFinalizacion : Date;

    @ApiProperty({ description: 'Colaboradores agregados' })
    colaborador : string[] ;



}