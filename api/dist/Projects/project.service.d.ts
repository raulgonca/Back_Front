import { Repository } from 'typeorm';
import { Project } from './project.entity';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<Project>);
    createProject(CreateProjectDto: any): Promise<Project>;
    getAllProject(): Promise<Project[]>;
    deleteProject(id: number): Promise<void>;
    findOne(id: number): Promise<Project | undefined>;
    updateProject(id: number, nameproject: string, description: string, fechaInicio: Date, fechaFinalizacion: Date): Promise<Project>;
}
