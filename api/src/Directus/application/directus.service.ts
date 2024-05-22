import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/Users/infrastructure/dto/create-user.dto';

@Injectable()
export class DirectusService {
  private readonly directusUrl = process.env.DIRECTUS_URL || 'http://0.0.0.0:8055';

  async getUserByUsername(username: string) {
    try {
      const response = await fetch(`${this.directusUrl}/items/Users?filter[username][_eq]=${username}`);
      
      if (!response.ok) {
        throw new HttpException(`Error fetching user: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(`Error fetching user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const response = await fetch(`${this.directusUrl}/items/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createUserDto),
      });
      
      if (!response.ok) {
        throw new HttpException(`Error creating user: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(`Error creating user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
