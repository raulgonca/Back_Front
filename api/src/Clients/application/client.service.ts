// cliente.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client } from '../domain/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const cliente = await this.clientRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async create(clienteData: Partial<Client>): Promise<Client> {
    const nuevoCliente = this.clientRepository.create(clienteData);
    return this.clientRepository.save(nuevoCliente);
  }

  async update(id: number, clienteData: Partial<Client>): Promise<Client> {
    const cliente = await this.findOne(id);
    this.clientRepository.merge(cliente, clienteData);
    return this.clientRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clientRepository.remove(cliente);
  }

  async searchByName(nombre: string): Promise<Client[]> {
    return this.clientRepository.find({
      where: {
        nombre: Like(`%${nombre}%`),
      },
    });
  }
}
