import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProject } from "./project-user.entity";
import { CreateProjectUserDto } from "../DTOs/create-project-user.dto"

@Injectable()
export class ProjectUserService {
  
  findByUsername(_username: string): UserProject[] | PromiseLike<UserProject[]> {
      throw new Error("Method not implemented.");
  }
  findByrepoId(_projectId: number): UserProject[] | PromiseLike<UserProject[]> {
      throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(UserProject)
    private projectUserRepository: Repository<UserProject>
  ) {}


  async create( createProjectUserDto: CreateProjectUserDto): Promise<UserProject> {
    const UserProject = this.projectUserRepository.create(createProjectUserDto);
    return this.projectUserRepository.save(UserProject);
  }

  async findAll(): Promise<UserProject[]> {
    return this.projectUserRepository.find();
  }

  async findOne(userId: number, projectId: number): Promise<UserProject> {
    return this.projectUserRepository.findOne({ where: { user_id: userId, project_id: projectId } });
  }

  async findByUserId(userId: number): Promise<UserProject[]> {
    return this.projectUserRepository.find({ where: { user_id: userId } });
  }

  async findByprojectId(projectId: number): Promise<UserProject[]> {
    return this.projectUserRepository.find({ where: { project_id: projectId } });
  }

  async update(userId: number, projectId: number, createProjectUserDto: CreateProjectUserDto): Promise<UserProject> {
    await this.projectUserRepository.update({ user_id: userId, project_id: projectId }, createProjectUserDto);
    return this.findOne(userId, projectId);
  }

  async remove(userId: number, projectId: number): Promise<void> {
    await this.projectUserRepository.delete({ user_id: userId, project_id: projectId });
  }

  async removeByprojectId(projectId: number): Promise<void> {
    await this.projectUserRepository.delete({ project_id: projectId });
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const user = await this.projectUserRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
    return user[0] || null;
  }

  //async findByUsername(username: string): Promise<UserProject[]> {
  //  return this.projectUserRepository
  //    .createQueryBuilder("staff_repo")
  //    .leftJoinAndSelect("staff_repo.staff", "staff")
  //    .leftJoinAndSelect("staff_repo.repo", "repo")
  //    .where("user.username = :username", { username })
  //    .getMany();
  //}

}
