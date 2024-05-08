import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { CreateProjectDto } from 'src/DTOs/create-project.dto';
import { UpdateProjectDto } from 'src/DTOs/UpdateProject.dto'; 
import { ProjectService } from './project.service';

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
    return this.projectService.getAllProject(); 
  }

   @Get(':id')
   getProjectById(@Param('id') id: number) {
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

  @Delete('/:id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }

  
  @Get("collaborators/:projectId")
  async getCollaboratorRepos(@Param("username") username: string) {
    return this.projectService.getProjectForCollaborator(username);
  }
 

}
