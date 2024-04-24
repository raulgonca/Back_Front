import { ProjectUserService } from './project-user.service';
import { UserProject } from "./project-user.entity";
import { CreateProjectUserDto } from "src/DTOs/create-project-user.dto";
export declare class ProjectUserController {
    private readonly projectUserService;
    constructor(projectUserService: ProjectUserService);
    create(createProjectUserDto: CreateProjectUserDto): Promise<UserProject>;
    findByStaffId(userId: number): Promise<UserProject[]>;
    findByrepoId(projectId: number): Promise<UserProject[]>;
    removeByrepoId(projectId: number): Promise<void>;
    findUsersByprojectId(projectId: number): Promise<string[]>;
    findOne(userId: number, projectId: number): Promise<UserProject>;
    findAll(): Promise<UserProject[]>;
    update(userId: number, projectId: number, staffProjectDto: UserProject): Promise<UserProject>;
    remove(userId: number, projectId: number): Promise<void>;
    findByUsername(username: string): Promise<UserProject[]>;
}
