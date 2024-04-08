import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';


@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(nameproject: string, description: string, fechaInicio: Date, fechaFinalizacion: Date): Promise<Project> {
    const poll = this.projectRepository.create({ nameproject, description, fechaInicio, fechaFinalizacion });
    return this.projectRepository.save(poll);
  }


  async getAllProject(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async deleteRepo(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}