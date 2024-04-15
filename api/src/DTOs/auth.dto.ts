// auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acceso' })
  accessToken: string;

  @ApiProperty({ description: 'Tiempo de expiración del token en segundos' })
  expiresIn: number;

  constructor(accessToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}
