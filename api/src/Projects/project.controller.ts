import { Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  
    createProject(@Body() createProjectDto : CreateProjectDto){
    return this.projectService.createProject( createProjectDto );
  }

  @Get()
  getAllProject() {
    return this.projectService.getAllProject();
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  async updateProject(@Param('id') id: string,@Body() { nameproject, description, fechaInicio, fechaFinalizacion }: { nameproject: string, description: string , fechaInicio : Date , fechaFinalizacion: Date } ) {
      // Obtener el proyecto existente
      const existingProject = await this.projectService.findOne(+id);

      // Verificar si la fecha de inicio ya está establecida en el proyecto existente
      if (existingProject.fechaInicio !== null) {
        // Si la fecha de inicio ya está establecida, no actualizamos este campo
        fechaInicio = existingProject.fechaInicio;
      }

      // Llamar al servicio para actualizar el proyecto
      return this.projectService.updateProject(+id, nameproject, description, fechaInicio, fechaFinalizacion);
  }

}


