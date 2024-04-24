import { UserService } from './user.service';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{
        menssage: string;
        User: import("./user.entity").User;
    }>;
    GetAllUser(): Promise<import("./user.entity").User[]>;
    login(username: string, password: string): Promise<{
        success: boolean;
        user?: {
            username: string;
        };
    }>;
}
