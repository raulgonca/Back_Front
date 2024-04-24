import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(createProjectDto: CreateProjectDto): Promise<import("./project.entity").Project>;
    getAllProject(): Promise<import("./project.entity").Project[]>;
    getProjectById(id: number): Promise<import("./project.entity").Project>;
    updateProject(id: string, { nameproject, description, fechaInicio, fechaFinalizacion }: {
        nameproject: string;
        description: string;
        fechaInicio: Date;
        fechaFinalizacion: Date;
    }): Promise<import("./project.entity").Project>;
    deleteProject(id: number): Promise<void>;
}
