import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { UpdateProjectDto } from 'src/DTOs/UpdateProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

    async createProject(CreateProjectDto): Promise<Project> {
      const project = this.projectRepository.create(CreateProjectDto)
      return this.projectRepository.save(CreateProjectDto);

    }
    
    async getUserProjects(userId: number): Promise<Project[]> {
      return this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.collaborators', 'collaborators')
        .where('project.ownerId = :userId OR collaborators.id = :userId', { userId })
        .getMany();
    }
    
  
    async getAllProject(): Promise<Project[]> {
      return this.projectRepository.find();
    }
  
    async deleteProject(id: number): Promise<void> {
      await this.projectRepository.delete(id);
    }
  
    async findOne(id: number): Promise<Project | undefined> {
      return this.projectRepository.findOne({ where: { id } });
    }
  
  
    async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
      const existingProject = await this.findOne(id);
      if (existingProject) {
        // If the start date is already set, keep it
        if (existingProject.fechaInicio) {
          updateProjectDto.fechaInicio = existingProject.fechaInicio;
        }
        // Call the service to update the project
        return this.updateProject  (id, updateProjectDto);
      } else {
        throw new Error('Project not found');
      }
    }
  
}
  
  