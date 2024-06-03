import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger'; // Importa los decoradores de Swagger necesarios
import { ClientService } from '../application/client.service';
import { Client } from '../domain/client.entity';

@ApiTags('clientes') // Etiqueta de Swagger para agrupar los endpoints relacionados con clientes
@Controller('clientes')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los clientes' })
  @ApiResponse({ status: 200, description: 'Clientes obtenidos exitosamente' })
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encuentra un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo cliente' })
  @ApiBody({ description: 'Datos del cliente', type: Client })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async create(@Body() clienteData: Partial<Client>): Promise<Client> {
    return this.clientService.create(clienteData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiBody({ description: 'Datos actualizados del cliente', type: Client })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(@Param('id') id: string, @Body() clienteData: Partial<Client>): Promise<Client> {
    return this.clientService.update(Number(id), clienteData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un cliente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', required: true })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(Number(id));
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca clientes por nombre' })
  @ApiQuery({ name: 'nombre', description: 'Nombre del cliente', required: false })
  @ApiResponse({ status: 200, description: 'Clientes encontrados exitosamente' })
  async searchByName(@Query('nombre') nombre: string): Promise<Client[]> {
    if (!nombre) {
      return this.clientService.findAll();
    }
    return this.clientService.searchByName(nombre);
  }
}
