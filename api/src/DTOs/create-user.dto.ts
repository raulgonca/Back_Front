import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Nombre de usuario' })
    username: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    password: string;
}
