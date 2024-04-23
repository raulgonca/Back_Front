import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";
export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'usuario123' })
  @IsString()
   @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Contraseña', example: 'contraseña123' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
