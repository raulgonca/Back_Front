import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';
//import { UpdateProjectDto } from 'src/DTOs/update-project.dto'; // Define un DTO para actualizar proyectos

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
    return this.projectService.getUserProjects(userId);
  }

  @Get()
  getAllProjects() {
    return this.projectService.getAllProject(); // Corregir nombre del método
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  // @Put(':id')
  // async updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   const existingProject = await this.projectService.findOne(+id);

  //   if (existingProject) { // Verificar si el proyecto existente no es null
  //     // Si la fecha de inicio ya está establecida, mantenerla
  //     if (existingProject.fechaInicio !== null) {
  //       updateProjectDto.fechaInicio = existingProject.fechaInicio;
  //     }

  //     // Llamar al servicio para actualizar el proyecto
  //     return this.projectService.updateProject(+id, updateProjectDto);
  //   } else {
  //     throw new Error('Proyecto no encontrado');
  //   }
  // }

  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
