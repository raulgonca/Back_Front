import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsOptional() 
  @IsString()
  nameproject?: string;

  @ApiProperty({ description: 'Breve descripción del proyecto' })
  @IsOptional() 
  @IsString() 
  description?: string;

  @ApiProperty({ description: 'Fecha de Inicio' })
  @IsOptional()
  @IsDate() 
  fechaInicio?: Date; 

  @ApiProperty({ description: 'Fecha de Finalización' })
  @IsOptional()
  @IsDate() 
  fechaFinalizacion?: Date; 

  @ApiProperty({ description: 'Colaboradores del proyecto' })
  @IsOptional() 
  @IsString({ each: true })
  collaborators?: string[]; 

  @ApiProperty({ description: 'Clientes asociados al proyecto' })
  @IsOptional() 
  @IsString({ each: true }) 
  cliente?: string[];

  @ApiProperty({ description: 'Tiempo estimado del proyecto en horas' })
  @IsNumber() 
  @IsOptional() 
  time?: number; 

}
