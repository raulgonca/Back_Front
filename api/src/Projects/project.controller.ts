import { Controller, Get, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}


  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado desde el token
    return this.projectService.getUserProjects(userId);
  }

  @Get()
  async getAllProject(): Promise<Project[]> {
    return this.projectService.getAllProject();
  }
}
