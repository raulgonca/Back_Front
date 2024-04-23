import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProjectUserDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    project_id: number;
}