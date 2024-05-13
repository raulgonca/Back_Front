// clientes.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClientService } from '../application/client.service';
import { Client } from '../domain/client.entity';

@Controller('clientes')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(Number(id));
  }

  @Post()
  async create(@Body() clienteData: Partial<Client>): Promise<Client> {
    return this.clientService.create(clienteData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteData: Partial<Client>): Promise<Client> {
    return this.clientService.update(Number(id), clienteData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(Number(id));
  }

  @Get('search')
  async searchByName(@Query('nombre') nombre: string): Promise<Client[]> {
    if (!nombre) {
      return this.clientService.findAll();
    }
    return this.clientService.searchByName(nombre);
  }
}
