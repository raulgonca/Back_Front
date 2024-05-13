import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  nameproject: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  fechaInicio: Date;

  @IsOptional()
  @IsDate()
  fechaFinalizacion: Date;

  @IsOptional()
  @IsDate()
  collaborators?: string[];

  @IsString()
  @IsOptional()
  cliente?: string[];

  @IsNumber()
  @IsOptional()
  time: number

}
