import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'usuario123' })
  readonly username: string;

  @ApiProperty({ description: 'Contraseña', example: 'contraseña123' })
  readonly password: string;
}
