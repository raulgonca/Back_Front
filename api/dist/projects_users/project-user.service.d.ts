import { Repository } from "typeorm";
import { UserProject } from "./project-user.entity";
import { CreateProjectUserDto } from "../DTOs/create-project-user.dto";
export declare class ProjectUserService {
    private projectUserRepository;
    findByUsername(username: string): UserProject[] | PromiseLike<UserProject[]>;
    findByrepoId(projectId: number): UserProject[] | PromiseLike<UserProject[]>;
    constructor(projectUserRepository: Repository<UserProject>);
    create(createProjectUserDto: CreateProjectUserDto): Promise<UserProject>;
    findAll(): Promise<UserProject[]>;
    findOne(userId: number, projectId: number): Promise<UserProject>;
    findByUserId(userId: number): Promise<UserProject[]>;
    findByprojectId(projectId: number): Promise<UserProject[]>;
    update(userId: number, projectId: number, createProjectUserDto: CreateProjectUserDto): Promise<UserProject>;
    remove(userId: number, projectId: number): Promise<void>;
    removeByprojectId(projectId: number): Promise<void>;
    findUserById(userId: number): Promise<{
        username: string;
    } | null>;
}
