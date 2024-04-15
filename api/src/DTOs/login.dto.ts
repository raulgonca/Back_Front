import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'usuario123' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Contraseña', example: 'contraseña123' })
  @IsString()
  readonly password: string;
}
