import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user-projects')
  async getUserProjects(@Request() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token
    return this.projectService.getUserProjects(userId);
  }
}
