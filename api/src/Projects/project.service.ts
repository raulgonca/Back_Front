import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  getAllProject(): Project[] | PromiseLike<Project[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async getUserProjects(userId: number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.collaborators', 'collaborators')
      .where('project.ownerId = :userId OR collaborators.id = :userId', { userId })
      .getMany();
  }

  async getAllUsers(): Promise<Project[]> {
    return this.projectRepository.find();
    }


}
