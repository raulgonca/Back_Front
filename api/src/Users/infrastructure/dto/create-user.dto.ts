import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Nombre de usuario' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Contraseña del usuario' })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'Correo del usuario' })
    gmail: string;
}
