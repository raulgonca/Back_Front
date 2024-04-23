import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectUserService } from './project-user.service';
import { UserProject } from "./project-user.entity";
import { CreateProjectUserDto } from "src/DTOs/create-project-user.dto";


@Controller("user-project")
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @Post()
  async create(
    @Body() createProjectUserDto: CreateProjectUserDto ): Promise<UserProject> {
    return this.projectUserService.create(createProjectUserDto);
  }

  @Get("users/:userId")
  async findByStaffId(@Param("userId") userId: number): Promise<UserProject[]> {
    return this.projectUserService.findByUserId(userId);
  }

  @Get("projects/:projectId")

  async findByrepoId(
    @Param("projectId") projectId: number): Promise<UserProject[]> {
    return this.projectUserService.findByprojectId(projectId);
  }

  @Delete("project/:projectId")
  async removeByrepoId(@Param("projectId") projectId: number): Promise<void> {
    return this.projectUserService.removeByprojectId(+projectId);
  }

  @Get("projects/:projectId/users")
  async findUsersByprojectId(@Param("projectId") projectId: number): Promise<string[]> {
    try {
      const members = await this.projectUserService.findByprojectId(projectId);

      const usernames = await Promise.all(
        members.map(async (member) => {
          const user = await this.projectUserService.findUserById(
            member.user_id
          );
          return user ? user.username : null;
        })
      );

      return usernames.filter((username) => username !== null);
    } catch (error) {
      console.error("Error fetching users by project ID:", error.message);
      throw new Error("Failed to fetch users");
    }
  }

  @Get(":userId/:projectId")
  async findOne(@Param("userId") userId: number,@Param("projectId") projectId: number): Promise<UserProject> {
    return this.projectUserService.findOne(+userId, +projectId);
  }

  @Get()
  async findAll(): Promise<UserProject[]> {
    return this.projectUserService.findAll();
  }

  @Put(":userId/:repoId")
  async update(@Param("userId") userId: number,@Param("projectId") projectId: number,@Body() staffProjectDto: UserProject): Promise<UserProject> {
    return this.projectUserService.update( +userId, +projectId, staffProjectDto );
  }

  @Delete(":userId/:repoId")
  async remove(@Param("userId") userId: number,@Param("projectId") projectId: number): Promise<void> {
    return this.projectUserService.remove(+userId, +projectId);
  }

  @Get("repo/:username") // Cambia la ruta para recibir el nombre de usuario
  async findByUsername( @Param("username") username: string ): Promise<UserProject[]> {
    return this.projectUserService.findByUsername(username);
  }
}