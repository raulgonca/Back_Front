<<<<<<< HEAD
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
=======
import { Controller, Get, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
>>>>>>> 1bb27441 (2/5 arreglos)

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
    return this.projectService.getUserProjects(userId);
  }
=======
  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado desde el token
    return this.projectService.getUserProjects(userId);
  }

  @Get()
  async getAllProject(): Promise<Project[]> {
    return this.projectService.getAllProject();
  }
>>>>>>> 1bb27441 (2/5 arreglos)
}
