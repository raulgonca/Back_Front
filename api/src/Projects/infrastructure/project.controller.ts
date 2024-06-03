import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'; 
import { ProjectService } from '../application/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { Project } from '../domain/project.entity';

@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBody({ type: CreateProjectDto, description: 'Datos para crear un nuevo proyecto' }) 
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('user-projects/:username')
  @ApiParam({ name: 'username', description: 'Nombre de usuario', type: String }) 
  async getUserProjects(@Param('username') username: string) {
    return this.projectService.getUserProjects(username);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los proyectos', type: [Project] }) 
  async getAllProjects() {
    return this.projectService.getAllProject(); 
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID del proyecto', type: Number }) 
  async getProjectById(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID del proyecto', type: Number }) 
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
  @ApiParam({ name: 'id', description: 'ID del proyecto', type: Number }) 
  async deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }

  @Get('collaborators/:projectId') 
  @ApiParam({ name: 'projectId', description: 'ID del proyecto', type: String }) 
  async getCollaboratorProject(@Param('projectId') projectId: string) {
    return this.projectService.getProjectForCollaborator(projectId);
  }

  @Get('clientes/:projectId') 
  @ApiParam({ name: 'projectId', description: 'ID del proyecto', type: String }) 
  async getClientesProject(@Param('projectId') projectId: string) {
    return this.projectService.getProjectForClientes(projectId);
  }

  @Patch(':id/time')
  @ApiParam({ name: 'id', description: 'ID del proyecto', type: Number })
  @ApiBody({ type: Number, description: 'Datos para actualizar el tiempo del proyecto' })
  async ActualizarTiempo(@Param('id') id: number, @Body() updateProjectDto: { time: number }): Promise<Project> {
    return this.projectService.ActualizarTiempo(id, updateProjectDto);
  }
 
  @Get(':id/time')
  @ApiParam({ name: 'id', description: 'ID del proyecto', type: Number }) 
  async ObtenerTiempo(@Param('id') id: number): Promise<number> {
    return this.projectService.ObtenerTiempo(id);
  }
}
