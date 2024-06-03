import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'; // Importa los decoradores de Swagger necesarios
import { Client } from '../domain/client.entity';

@Injectable()
@ApiTags('clients') // Etiqueta de Swagger para este controlador
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  @ApiOperation({ summary: 'Obtiene todos los clientes' })
  @ApiResponse({ status: 200, description: 'Clientes obtenidos exitosamente' })
  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  @ApiOperation({ summary: 'Encuentra un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(id: number): Promise<Client> {
    const cliente = await this.clientRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  @ApiOperation({ summary: 'Crea un nuevo cliente' })
  @ApiBody({ description: 'Datos del cliente', type: Client })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async create(clienteData: Partial<Client>): Promise<Client> {
    const nuevoCliente = this.clientRepository.create(clienteData);
    return this.clientRepository.save(nuevoCliente);
  }

  @ApiOperation({ summary: 'Actualiza un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiBody({ description: 'Datos actualizados del cliente', type: Client })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(id: number, clienteData: Partial<Client>): Promise<Client> {
    const cliente = await this.findOne(id);
    this.clientRepository.merge(cliente, clienteData);
    return this.clientRepository.save(cliente);
  }

  @ApiOperation({ summary: 'Elimina un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clientRepository.remove(cliente);
  }

  @ApiOperation({ summary: 'Busca clientes por nombre' })
  @ApiParam({ name: 'nombre', description: 'Nombre del cliente', required: true })
  @ApiResponse({ status: 200, description: 'Clientes encontrados exitosamente' })
  async searchByName(nombre: string): Promise<Client[]> {
    return this.clientRepository.find({
      where: {
        nombre: Like(`%${nombre}%`),
      },
    });
  }
}
