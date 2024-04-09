import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

  async findOne(id: number): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  async updateProject(
    id: number,
    nameproject: string,
    description: string,
    fechaInicio: Date,
    fechaFinalizacion: Date,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new Error(`Proyecto con id ${id} no encontrado`);
    }

    project.nameproject = nameproject;
    project.description = description;
    project.fechaInicio = fechaInicio;
    project.fechaFinalizacion = fechaFinalizacion;

    return this.projectRepository.save(project);
  }


}