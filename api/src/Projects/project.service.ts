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
    const project = this.projectRepository.create({ nameproject, description, fechaInicio, fechaFinalizacion });
    return this.projectRepository.save(project);
  }

  async getAllProject(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

<<<<<<< HEAD
  async findOne(id: number): Promise<Project> {
    throw new Error('Method not implemented.');
  }
=======
  async findOne(id: number): Promise<Project | undefined> {
    return this.projectRepository.findOne({ where: { id } });
  }
  
>>>>>>> 28641bed (10/4 update Project)

  async updateProject(
    id: number,
    nameproject: string,
    description: string,
    fechaInicio: Date,
    fechaFinalizacion: Date,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
<<<<<<< HEAD
      throw new Error(`Proyecto con id ${id} no encontrado`);
    }

=======
      throw new Error(`Project with id ${id} not found`);
    }

    // Aquí puedes realizar cualquier lógica adicional que necesites para la actualización del proyecto
>>>>>>> 28641bed (10/4 update Project)
    project.nameproject = nameproject;
    project.description = description;
    project.fechaInicio = fechaInicio;
    project.fechaFinalizacion = fechaFinalizacion;

    return this.projectRepository.save(project);
  }
<<<<<<< HEAD


}
=======
}
>>>>>>> 28641bed (10/4 update Project)
