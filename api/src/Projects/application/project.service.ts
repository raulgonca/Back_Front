import { Project } from '../domain/project.entity';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
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
    
    async getUserProjects(username: string): Promise<Project[]> {
      return this.projectRepository.find( { where: { owner:username } } )
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
        if (existingProject.fechaInicio) {
          updateProjectDto.fechaInicio = existingProject.fechaInicio;
        }
        return this.updateProject  (id, updateProjectDto);
      } else {
        throw new Error('Project not found');
      }
    }

    async getProjectForCollaborator(username: string): Promise<Project[]> {
      return this.projectRepository.find({
        where: [
          { collaborators: Like(`%${username}%`) }
        ]
      });
    }

    // metodos para los clientes
    async getProjectForClientes(username: string): Promise<Project[]> {
      return this.projectRepository.find({
        where: [
          { cliente: Like(`%${username}%`) }
        ]
      });
    }

    // Clockifi timer
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Actualizar Timer
    async ActualizarTiempo(id: number, updateProjectDto: { time: number }): Promise<Project> {
      const { time } = updateProjectDto;
    
      try {
        const project = await this.projectRepository.findOne({where : {id}});
        if (!project) {
          throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
        }
        project.time = time;
        return this.projectRepository.save(project);
      } catch (error) {
        throw new InternalServerErrorException(`Error al actualizar tiempo del proyecto con id ${id}`);
      }
    }
    

    // Obtener Timer
    async ObtenerTiempo(id: number): Promise<number> {
      try {
        const project = await this.projectRepository.findOne({where : {id}});
        if (!project) {
          throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
        }
        return project.time;
      } catch (error) {
        throw new InternalServerErrorException(`Error al obtener tiempo del proyecto con id ${id}`);
      }
    }
    
  
}