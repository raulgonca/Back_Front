import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../DTOs/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    userService: any;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: number): Promise<void>;
    validateUser(username: string, password: string): Promise<any>;
}
