import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';
import { UpdateProjectDto } from 'src/DTOs/UpdateProject.dto'; // Define un DTO para actualizar proyectos

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('user-projects/:username')
  async getUserProjects(@Param("username") username:string) {
    return this.projectService.getUserProjects(username);
}


  @Get()
  getAllProjects() {
    return this.projectService.getAllProject(); // Corregir nombre del método
  }

   @Get(':id')
   getProjectById(@Param('id') id: number) {
     return this.projectService.findOne(id);
   }

   @Put(':id')
async updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  const existingProject = await this.projectService.findOne(+id);
  if (existingProject) {
    // If the start date is already set, keep it
    if (existingProject.fechaInicio) {
      updateProjectDto.fechaInicio = existingProject.fechaInicio;
    }
    // Call the service to update the project
    return this.projectService.updateProject(+id, updateProjectDto);
  } else {
    throw new Error('Project not found');
  }
}

  @Delete('/:id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
