import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(username: string, password: string) : Promise<User>{
        const poll = this.userRepository.create({ username, password});
        return this.userRepository.save(poll);
    }

    async findByUsername(username: string): Promise<User>{
        return this.userRepository.findOne({ where : { username}});
    }

    async getAllUser(): Promise<User[]>{
        return this.userRepository.find();
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }

    

}