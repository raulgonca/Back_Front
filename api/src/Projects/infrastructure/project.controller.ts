import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';
import { UpdateProjectDto } from 'src/DTOs/UpdateProject.dto';
import { ProjectService } from '../application/project.service';
import { Project } from '../domain/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('user-projects/:username')
  async getUserProjects(@Param('username') username: string) {
    return this.projectService.getUserProjects(username);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.getAllProject(); 
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const existingProject = await this.projectService.findOne(+id);
    if (existingProject) {
      if (existingProject.fechaInicio) {
        updateProjectDto.fechaInicio = existingProject.fechaInicio;
      }
      return this.projectService.updateProject(+id, updateProjectDto);
    } else {
      throw new Error('Project not found');
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }

  @Get('collaborators/:projectId') // Corregido el nombre del parámetro en la ruta
  async getCollaboratorProject(@Param('projectId') projectId: string) {
    return this.projectService.getProjectForCollaborator(projectId);
  }

  @Get('clientes/:projectId') 
  async getClientesProject(@Param('projectId') projectId: string) {
    return this.projectService.getProjectForClientes(projectId);
  }

  @Patch(':id/time')
  async ActualizarTiempo(@Param('id') id: number, @Body() updateProjectDto: { time: number }): Promise<Project> {
    return this.projectService.ActualizarTiempo(id, updateProjectDto);
  }
 
  @Get(':id/time')
  async ObtenerTiempo(@Param('id') id: number): Promise<number> {
    return this.projectService.ObtenerTiempo(id);
  }

}
