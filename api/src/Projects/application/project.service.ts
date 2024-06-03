import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger'; 
import { UpdateProjectDto } from '../infrastructure/dto/UpdateProject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Project } from '../domain/project.entity';

@Injectable()
@ApiTags('projects')
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  @ApiResponse({ status: 201, description: 'Crea un nuevo proyecto' })
  async createProject(CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(CreateProjectDto);
    return this.projectRepository.save(CreateProjectDto);
  }

  @ApiResponse({ status: 200, description: 'Obtiene todos los proyectos de un usuario' })
  async getUserProjects(username: string): Promise<Project[]> {
    return this.projectRepository.find({ where: { owner: username } });
  }

  @ApiResponse({ status: 200, description: 'Obtiene todos los proyectos' })
  async getAllProject(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  @ApiResponse({ status: 200, description: 'Elimina un proyecto por su ID' })
  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  @ApiResponse({ status: 200, description: 'Encuentra un proyecto por su ID' })
  async findOne(id: number): Promise<Project | undefined> {
    return this.projectRepository.findOne({ where: { id } });
  }

  @ApiResponse({ status: 200, description: 'Actualiza un proyecto por su ID' })
  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const existingProject = await this.findOne(id);
    if (existingProject) {
      if (existingProject.fechaInicio) {
        updateProjectDto.fechaInicio = existingProject.fechaInicio;
      }
      return this.updateProject(id, updateProjectDto);
    } else {
      throw new NotFoundException('Project not found');
    }
  }

  @ApiResponse({ status: 200, description: 'Obtiene los proyectos en los que un usuario es colaborador' })
  async getProjectForCollaborator(username: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: [
        { collaborators: Like(`%${username}%`) }
      ]
    });
  }

  @ApiResponse({ status: 200, description: 'Obtiene los proyectos asociados a un cliente' })
  async getProjectForClientes(username: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: [
        { cliente: Like(`%${username}%`) }
      ]
    });
  }

  @ApiResponse({ status: 200, description: 'Actualiza el tiempo de un proyecto' })
  async ActualizarTiempo(
    id: number,
    updateProjectDto: { time: number }
  ): Promise<Project> {
    const { time } = updateProjectDto;

    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
      }
      project.time = time;
      return this.projectRepository.save(project);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar tiempo del proyecto con id ${id}`
      );
    }
  }

  @ApiResponse({ status: 200, description: 'Obtiene el tiempo de un proyecto' })
  async ObtenerTiempo(id: number): Promise<number> {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
      }
      return project.time;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al obtener tiempo del proyecto con id ${id}`
      );
    }
  }
}
